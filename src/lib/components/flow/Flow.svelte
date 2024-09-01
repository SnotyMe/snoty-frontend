<script lang="ts">
    import '@xyflow/svelte/dist/style.css';
    import { Background, Controls, type Edge, MarkerType, MiniMap, type Node, SvelteFlow } from "@xyflow/svelte";
    import { writable } from "svelte/store";
    import { DISPOSE_EDGE, edgeTypes, FLOW_NODE, nodeTypes } from "$lib/model/svelte_flow";
    import { getLayoutedElements } from "$lib/components/flow/flow_utils";
    import { getNodeMetadata, type NodeMetadataMap, type NodeSettings, type StandaloneNode } from "$lib/model/nodes";
    import { onMount } from "svelte";
    import FlowNode from "$lib/components/node/Node.svelte";
    import { connectNodes, deleteNode, disconnectNodes, updateSettings } from "$lib/api/node_api";
    import type { ApiProps } from "$lib/api/api";
    import type { NodeCreatedHandler } from "$lib/components/add";
    import type { WorkflowWithNodes } from "$lib/model/flows";
    import FlowMenus from "$lib/components/flow/FlowMenus.svelte";

    type Props = {
        flow: WorkflowWithNodes
        metadatas: NodeMetadataMap
        apiProps: ApiProps
        colorScheme: string
    }
    const { flow, metadatas, apiProps, colorScheme }: Props = $props()

    function createNodeFromNode(node: StandaloneNode) {
        return {
            id: node._id,
            position: { x: 0, y: 0 },
            data: {
                ...node,
                metadata: getNodeMetadata(metadatas, node.descriptor)!,
                onsettingschange: (newSettings: NodeSettings) => updateSettings(apiProps, node._id, newSettings),
                ondelete: () => {
                    deleteNode(apiProps, node._id)
                        .then(() => nodesStore.update(nodes => nodes.filter(n => n.id !== node._id)))
                },
            },
            dragHandle: '.drag-handle',
            type: FLOW_NODE
        } as Node;
    }

    const initialNodes = flow.nodes.map(createNodeFromNode);
    const initialEdges = flow.nodes.flatMap(node =>
        (node.next ?? []).map(next => ({
            id: `${node._id}:${next}`,
            source: node._id,
            target: next,
            data: {
                ondisconnect: () => disconnectNodes(apiProps, node._id, next)
            }
        } as Edge))
    );

    const nodesStore = writable<Node[]>([])
    const edgesStore = writable<Edge[]>([])

    // never-ending promise while the layout is being calculated
    let promise: Promise<void> = $state(new Promise(() => {}));

    const heights: Record<string, number> = {}
    const widths: Record<string, number> = {}

    onMount(() => {
        promise = getLayoutedElements(
            initialNodes,
            initialEdges,
            widths,
            heights,
            { 'elk.direction': "RIGHT" }
        ).then(({ nodes: layoutedNodes, edges: layoutedEdges }) => {
            $nodesStore = layoutedNodes
            $edgesStore = layoutedEdges
        })
    })

    const addNode: NodeCreatedHandler = async (node: StandaloneNode) => {
        const newNode = createNodeFromNode(node)
        nodesStore.update(nodes => [...nodes, newNode])
    }
</script>

<!-- hidden dummy element with all initial settings to measure the node size for autolayouting -->
<div class="absolute opacity-0">
    {#each flow.nodes as node}
        <FlowNode bind:clientWidth={widths[node._id]} bind:clientHeight={heights[node._id]} data={{...node, metadata: getNodeMetadata(metadatas, node.descriptor)}}/>
    {/each}
</div>

<SvelteFlow proOptions={{hideAttribution: true}}
            colorMode="{colorScheme}"
            {nodeTypes}
            {edgeTypes}
            nodes={nodesStore}
            edges={edgesStore}
            fitView={true}
            defaultEdgeOptions={{
                    type: DISPOSE_EDGE,
                    markerEnd: {
                        type: MarkerType.Arrow,
                        width: 25,
                        height: 25
                    }
                }}
            class="svelte-flow"
            onconnect={(event) => connectNodes(apiProps, event.source, event.target)}
>
    <Background/>
    {#await promise}
        <div class="w-full h-full flex justify-center items-center">
            <p>Loading...</p>
        </div>
    {:then _}
        <Controls/>
        <MiniMap/>
        <FlowMenus {flow} {apiProps} {metadatas} onnodecreated={addNode}/>
    {/await}
</SvelteFlow>
