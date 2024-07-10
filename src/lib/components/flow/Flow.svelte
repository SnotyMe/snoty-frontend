<script lang="ts">
    import '@xyflow/svelte/dist/style.css';
    import { Background, Controls, type Edge, MarkerType, MiniMap, type Node, SvelteFlow } from "@xyflow/svelte";
    import { writable } from "svelte/store";
    import type { FlowNode } from "$lib/model/nodes";
    import { DISPOSE_EDGE, edgeTypes, FLOW_NODE, nodeTypes } from "$lib/model/svelte_flow";
    import { getLayoutedElements } from "$lib/components/flow/flow_utils";

    type Props = {
        rootNode: FlowNode,
        involved: FlowNode[]
    }
    const { rootNode, involved }: Props = $props()

    const initialNodes = involved.map(node => {
        return ({
            id: node.id,
            position: { x: 0, y: 0 },
            data: node,
            type: FLOW_NODE
        } as Node)
    });

    const initialEdges = involved.flatMap(node =>
        (node.next ?? []).map(next => ({
            id: `${node.id}:${next}`,
            source: node.id,
            target: next
        } as Edge))
    );

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        initialNodes,
        initialEdges
    )

    const nodesStore = writable<Node[]>()
    nodesStore.set(layoutedNodes)
    const edgesStore = writable<Edge[]>()
    edgesStore.set(layoutedEdges)
</script>

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
    <Controls/>
    <MiniMap/>
</SvelteFlow>
