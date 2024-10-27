import type { FlowNode, NodeId } from "$lib/model/nodes";
import type { NodeLogEntry } from "$lib/model/node_logs";

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
    triggeredBy: TriggerReason
    startDate: Date
    status: FlowExecutionStatus
    logs: NodeLogEntry[]
}

export type EnumeratedFlowExecution = Omit<FlowExecution, "logs">

export enum FlowExecutionStatus {
    RUNNING = "RUNNING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
}

type TriggerReason = {
    type: "Unknown"
} | {
    type: "Manual"
} | {
    type: "Schedule"
}
