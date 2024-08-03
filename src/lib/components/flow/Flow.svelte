<script lang="ts">
    import '@xyflow/svelte/dist/style.css';
    import { Background, Controls, type Edge, MarkerType, MiniMap, type Node, SvelteFlow } from "@xyflow/svelte";
    import { writable } from "svelte/store";
    import { DISPOSE_EDGE, edgeTypes, FLOW_NODE, nodeTypes } from "$lib/model/svelte_flow";
    import { getLayoutedElements, resolveNodes } from "$lib/components/flow/flow_utils";
    import { getNodeMetadata, type NodeMetadata, type NodeSettings, type RelationalNode } from "$lib/model/nodes";
    import { onMount } from "svelte";
    import FlowNode from "$lib/components/node/Node.svelte";
    import { disconnectNodes, updateSettings } from "$lib/api/node_api";
    import type { ApiProps } from "$lib/api/api";
    import Logs from "$lib/components/logs/Logs.svelte";

    type Props = {
        rootNode: RelationalNode,
        metadatas: Map<string, NodeMetadata>,
        apiProps: ApiProps
    }
    const { rootNode, metadatas, apiProps }: Props = $props()

    const { allNodes, involvedNodes } = resolveNodes(rootNode);
    const initialNodes = involvedNodes.map(node => {
        return ({
            id: node._id,
            position: { x: 0, y: 0 },
            data: {
                ...node,
                metadata: getNodeMetadata(metadatas, node.descriptor)!,
                onsettingschange: (newSettings: NodeSettings) => updateSettings(apiProps, node._id, newSettings),
            },
            dragHandle: '.drag-handle',
            type: FLOW_NODE
        } as Node)
    });

    const initialEdges = allNodes.flatMap(node =>
        (node.next ?? []).map(next => ({
            id: `${node._id}:${next._id}`,
            source: node._id,
            target: next._id,
            data: {
                ondisconnect: () => disconnectNodes(apiProps, node._id, next._id)
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
</script>

<!-- hidden dummy element with all initial settings to measure the node size for autolayouting -->
<div class="absolute opacity-0">
    {#each involvedNodes as node}
        <FlowNode bind:clientWidth={widths[node._id]} bind:clientHeight={heights[node._id]} data={{...node, metadata: getNodeMetadata(metadatas, node.descriptor)}}/>
    {/each}
</div>

<SvelteFlow proOptions={{hideAttribution: true}}
            colorMode="system"
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
            class="svelte-flow">
    <Background/>
    {#await promise}
        <div class="w-full h-full flex justify-center items-center">
            <p>Loading...</p>
        </div>
    {:then _}
        <Controls/>
        <MiniMap/>
        <Logs rootNode={rootNode._id} {apiProps}/>
    {/await}
</SvelteFlow>
