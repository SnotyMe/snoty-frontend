import { type Edge, type Node, Position } from "@xyflow/svelte";
import type { ElkNode } from "elkjs/lib/elk-api";

const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '200',
    // fixes overlapping nodes
    'elk.spacing.edgeNode': '150',
    'elk.edgeRouting': 'SPLINES',
};

export async function getLayoutedElements(
    nodes: Node[],
    edges: Edge[],
    widths: Record<string, number>,
    heights: Record<string, number>,
    options: Record<string, string> = {}
): Promise<{ nodes: Node[], edges: Edge[] }> {
    const { default: ELK } = await import('elkjs/lib/elk.bundled.js');

    const elk = new ELK();

    options = { ...options, ...elkOptions }
    const isHorizontal = options?.['elk.direction'] === 'RIGHT';
    let elkEdges = edges.map((edge) => ({
        ...edge,
        id: edge.id,
        sources: [edge.source],
        targets: [edge.target]
    }));
    let elkChildren: ElkNode[] = nodes.map((node) => ({
        ...node,
        // Adjust the target and source handle positions based on the layout
        // direction.
        targetPosition: isHorizontal ? Position.Left : Position.Top,
        sourcePosition: isHorizontal ? Position.Right : Position.Bottom,

        // Hardcode a width and height for elk to use when layouting.
        width: Math.max(500, widths[node.id as string]),
        height: heights[node.id as string]
    }));
    const graph: ElkNode = {
        id: 'root',
        layoutOptions: options,
        children: elkChildren,
        edges: elkEdges
    };

    const layoutedGraph = await elk
        .layout(graph);

    // noinspection TypeScriptValidateTypes
    // @ts-ignore
    return ({
        nodes: layoutedGraph.children?.map((node_1) => ({
            ...node_1,
            // React Flow expects a position property on the node instead of `x`
            // and `y` fields.
            position: { x: node_1.x, y: node_1.y }
        })),

        edges: layoutedGraph.edges?.map(e => ({
            ...e,
            id: e.id,
            source: e.sources[0],
            target: e.targets[0]
        } as Edge))
    });
}
