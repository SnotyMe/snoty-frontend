<script lang="ts">
    import '@xyflow/svelte/dist/style.css';
    import { Background, Controls, type Edge, MarkerType, MiniMap, type Node, SvelteFlow } from "@xyflow/svelte";
    import { writable } from "svelte/store";
    import { DISPOSE_EDGE, edgeTypes, FLOW_NODE, nodeTypes } from "$lib/model/svelte_flow";
    import { getLayoutedElements, resolveNodes } from "$lib/components/flow/flow_utils";
    import type { RelationalNode } from "$lib/model/nodes";
    import { onMount } from "svelte";
    import FlowNode from "$lib/components/flow/FlowNode.svelte";

    type Props = {
        rootNode: RelationalNode,
    }
    const { rootNode }: Props = $props()

    const { allNodes, involvedNodes } = resolveNodes(rootNode);
    const initialNodes = involvedNodes.map(node => {
        return ({
            id: node._id,
            position: { x: 0, y: 0 },
            data: node,
            dragHandle: '.drag-handle',
            type: FLOW_NODE
        } as Node)
    });

    const initialEdges = allNodes.flatMap(node =>
        (node.next ?? []).map(next => ({
            id: `${node._id}:${next._id}`,
            source: node._id,
            target: next._id
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
        <FlowNode bind:clientWidth={widths[node._id]} bind:clientHeight={heights[node._id]} data={node}/>
    {/each}
</div>

<SvelteFlow proOptions={{hideAttribution: true}}
            colorMode="dark"
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
    {/await}
</SvelteFlow>
