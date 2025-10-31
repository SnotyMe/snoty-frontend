<script lang="ts">
    import '@xyflow/svelte/dist/style.css';
    import {
        Background,
        Controls,
        type Edge,
        MarkerType,
        MiniMap,
        type Node,
        SvelteFlow,
        useSvelteFlow,
    } from "@xyflow/svelte";
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
    import type { OnDisconnectEvent } from "$lib/components/flow/dispose_button_edge";

    type Props = {
        flow: WorkflowWithNodes
        metadatas: NodeMetadataMap
        templates: NodeTemplatesMap
        apiProps: ApiProps
    }
    const { flow, metadatas, templates, apiProps }: Props = $props()

    const heights: Record<string, number> = $state({});
    const widths: Record<string, number> = $state({});

    function createNodeFromNode(node: StandaloneNode, extraData: any = {}) {
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
                        .then(() => {
                            nodesStore = nodesStore.filter(n => n.id !== node._id);
                        });
                },
                heights,
                widths,
                ...extraData,
            },
            dragHandle: '.drag-handle',
            type: FLOW_NODE
        } as Node;
    }

    const initialNodes = flow.nodes.map(n => createNodeFromNode(n, { initializing: true }));
    const initialEdges = flow.nodes.flatMap(node =>
        (node.next ?? []).map(next => ({
            id: `${node._id}:${next}`,
            source: node._id,
            target: next,
        } as Edge))
    );

    let nodesStore = $state.raw<Node[]>(initialNodes);
    let edgesStore = $state.raw<Edge[]>(initialEdges);

    const { promise, resolve } = Promise.withResolvers()

    $effect(() => {
        if (Object.keys(widths).length === initialNodes.length && Object.keys(heights).length === initialNodes.length) {
            updateLayout()
                .then(() => resolve(null));
        }
    })

    const svelteFlow = useSvelteFlow()

    async function updateLayout() {
        const layoutedNodes = (await getLayoutedElements(
            initialNodes,
            initialEdges,
            widths,
            heights,
            { 'elk.direction': "RIGHT" }
        )).nodes

        nodesStore = layoutedNodes.map(d => ({ ...d, data: { ...d.data, initializing: false } }));
        if (nodesStore.length == 0) return;
        for (let i = 0; i < 10; i++) {
            await svelteFlow.fitView();
        }
    }

    const addNode: NodeCreatedHandler = async (node: StandaloneNode) => {
        const newNode = createNodeFromNode(node);
        newNode.width = Object.values(widths).reduce((acc, val) => acc + val, 0) / Object.keys(widths).length;
        newNode.data.highlight = true;
        // do not use `.push` because Svelte 5 is totally bugged
        nodesStore = [...nodesStore, newNode];
    }
</script>

<SvelteFlow proOptions={{hideAttribution: true}}
            {nodeTypes}
            {edgeTypes}
            fitView
            bind:nodes={nodesStore}
            bind:edges={edgesStore}
            defaultEdgeOptions={{
                    type: DISPOSE_EDGE,
                    markerEnd: {
                        type: MarkerType.Arrow,
                        width: 25,
                        height: 25
                    },
                    animated: true,
                    data: {
                        ondisconnect: ({ detail }: OnDisconnectEvent) => disconnectNodes(apiProps, detail.source, detail.target)
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
