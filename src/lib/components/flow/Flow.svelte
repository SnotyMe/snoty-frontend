<script lang="ts">
    import '@xyflow/svelte/dist/style.css';
    import { Background, Controls, type Edge, MarkerType, MiniMap, type Node, SvelteFlow } from "@xyflow/svelte";
    import { writable } from "svelte/store";
    import { DISPOSE_EDGE, edgeTypes, FLOW_NODE, nodeTypes } from "$lib/model/svelte_flow";
    import { getLayoutedElements } from "$lib/components/flow/flow_utils";
    import {
        getNodeMetadata,
        getNodeTemplates,
        type NodeMetadataMap,
        type NodeSettings,
        type NodeTemplatesMap,
        type StandaloneNode
    } from "$lib/model/nodes";
    import { connectNodes, deleteNode, disconnectNodes, updateSettings } from "$lib/api/node_api";
    import type { ApiProps } from "$lib/api/api";
    import type { NodeCreatedHandler } from "$lib/components/add";
    import type { WorkflowWithNodes } from "$lib/model/flows";
    import FlowMenus from "$lib/components/flow/FlowMenus.svelte";
    import { useSvelteFlow } from "@xyflow/svelte";

    type Props = {
        flow: WorkflowWithNodes
        metadatas: NodeMetadataMap
        templates: NodeTemplatesMap
        apiProps: ApiProps
    }
    const { flow, metadatas, templates, apiProps }: Props = $props()

    const heights: Record<string, number> = $state({});
    const widths: Record<string, number> = $state({});

    function createNodeFromNode(node: StandaloneNode) {
        return {
            id: node._id,
            position: { x: 0, y: 0 },
            data: {
                apiProps,
                node,
                metadata: getNodeMetadata(metadatas, node.descriptor)!,
                templates: templates ? getNodeTemplates(templates, node.descriptor) : undefined,
                onsettingschange: (newSettings: NodeSettings) => updateSettings(apiProps, node._id, newSettings),
                ondelete: () => {
                    deleteNode(apiProps, node._id)
                        .then(() => nodesStore.update(nodes => nodes.filter(n => n.id !== node._id)));
                },
                heights,
                widths,
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
            animated: true,
            data: {
                ondisconnect: () => disconnectNodes(apiProps, node._id, next)
            }
        } as Edge))
    );

    const nodesStore = writable<Node[]>(initialNodes);
    const edgesStore = writable<Edge[]>(initialEdges);
    const { fitView } = useSvelteFlow();

    // never-ending promise while the layout is being calculated
    let promise: Promise<void> = $state(new Promise(() => {}));

    $effect(() => {
        if (Object.keys(widths).length === initialNodes.length && Object.keys(heights).length === initialNodes.length) {
            updateLayout();
        }
    })

    function updateLayout() {
        promise = getLayoutedElements(
            initialNodes,
            initialEdges,
            widths,
            heights,
            { 'elk.direction': "RIGHT" }
        ).then(({ nodes: layoutedNodes }) => {
            layoutedNodes.forEach(node => {
                const { width, height, position } = node;
                nodesStore.update(nodes => nodes.map(n => n.id === node.id ? { ...n, width, height, position } : n));
            });
            fitView({
                padding: 50,
            });
        })
    }

    const addNode: NodeCreatedHandler = async (node: StandaloneNode) => {
        const newNode = createNodeFromNode(node);
        newNode.width = Object.values(widths).reduce((acc, val) => acc + val, 0) / Object.keys(widths).length;
        nodesStore.update(nodes => [...nodes, newNode]);
    }
</script>

<SvelteFlow proOptions={{hideAttribution: true}}
            {nodeTypes}
            {edgeTypes}
            nodes={nodesStore}
            edges={edgesStore}
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
        <style>
            .svelte-flow__pane {
                opacity: 0;
                pointer-events: none;
            }
        </style>
        <div class="w-full h-full flex justify-center items-center">
            <p>Loading...</p>
        </div>
    {:then _}
        <Controls/>
        <MiniMap/>
        <FlowMenus {flow} {apiProps} {metadatas} onnodecreated={addNode}/>
    {:catch error}
        Something went wrong: {error}
    {/await}
</SvelteFlow>
