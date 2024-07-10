import ELK, { type ElkNode } from 'elkjs/lib/elk.bundled.js';
import { type Node, type Edge, Position } from "@xyflow/svelte";

const elk = new ELK();

const elkOptions = {
    'elk.algorithm': 'layered',
    'elk.layered.spacing.nodeNodeBetweenLayers': '200',
    'elk.spacing.nodeNode': '80'
}

export async function getLayoutedElements(nodes: Node[], edges: Edge[], options: Record<string, string> = {}) {
    options = { ...options, ...elkOptions }
    const isHorizontal = options?.['elk.direction'] === 'RIGHT';
    const graph: ElkNode = {
        id: 'root',
        layoutOptions: options,
        children: nodes.map((node) => ({
            ...node,
            // Adjust the target and source handle positions based on the layout
            // direction.
            targetPosition: isHorizontal ? Position.Left : Position.Top,
            sourcePosition: isHorizontal ? Position.Right : Position.Bottom,

            // Hardcode a width and height for elk to use when layouting.
            width: 400,
            height: 100
        })),
        edges: edges
    };

    const layoutedGraph = await elk
        .layout(graph);
    return ({
        nodes: layoutedGraph.children.map((node_1) => ({
            ...node_1,
            // React Flow expects a position property on the node instead of `x`
            // and `y` fields.
            position: { x: node_1.x, y: node_1.y }
        })),

        edges: layoutedGraph.edges
    });
}
