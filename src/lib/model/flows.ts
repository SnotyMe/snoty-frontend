import type { FlowNode } from "$lib/model/nodes";

export interface Workflow {
    _id: string
    name: string
}

export interface WorkflowWithNodes extends Workflow {
    nodes: FlowNode[]
}
