<script lang="ts">
    import '@xyflow/svelte/dist/style.css';
    import { Background, Controls, type Edge, MarkerType, MiniMap, type Node, SvelteFlow } from "@xyflow/svelte";
    import { writable } from "svelte/store";
    import type { FlowNode } from "$lib/model/nodes";
    import { DISPOSE_EDGE, edgeTypes, FLOW_NODE, nodeTypes } from "$lib/model/svelte_flow";

    type Props = {
        rootNode: FlowNode,
        involved: FlowNode[]
    }
    const { rootNode, involved }: Props = $props()

    const nodes = writable<Node[]>()
    nodes.set(involved.map(node => {
        return ({
            id: node.id,
            position: { x: 0, y: 0 },
            data: node,
            type: FLOW_NODE
        } as Node)
    }))

    const edges = writable<Edge[]>()
    const value = involved.flatMap(node =>
        (node.next ?? []).map(next => ({
            id: `${node.id}:${next}`,
            source: node.id,
            target: next
        } as Edge))
    );
    edges.set(value)
</script>

<SvelteFlow proOptions={{hideAttribution: true}}
            colorMode="dark"
            {nodeTypes}
            {edgeTypes}
            {nodes}
            {edges}
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
