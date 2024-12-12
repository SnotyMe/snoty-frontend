import FlowNode from "$lib/components/node/Node.svelte";
import DisposeButtonEdge from "$lib/components/flow/DisposeButtonEdge.svelte";

export const FLOW_NODE = "flow-node";
export const nodeTypes = {
    'flow-node': FlowNode
};

export const DISPOSE_EDGE = "dispose-edge";
export const edgeTypes = {
    'dispose-edge': DisposeButtonEdge
};
