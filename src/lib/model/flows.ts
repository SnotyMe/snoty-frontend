import type { FlowNode, NodeId } from "$lib/model/nodes";

export interface Workflow {
    _id: string
    name: string
}

export interface WorkflowWithNodes extends Workflow {
    nodes: FlowNode[]
}

export interface FlowExecution {
    jobId: string
    flowId: NodeId
    startDate: Date
    status: FlowExecutionStatus
}

export enum FlowExecutionStatus {
    RUNNING = "RUNNING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
}
