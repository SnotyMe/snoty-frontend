import type { FlowNode, NodeId } from "$lib/model/nodes";
import type { NodeLogEntry } from "$lib/model/node_logs";

export interface Workflow {
    _id: string
    name: string
    settings: WorkflowSettings
}

export interface WorkflowWithNodes extends Workflow {
    nodes: FlowNode[]
}

export interface WorkflowSettings {
    schedule: FlowSchedule
}

export type FlowSchedule = RecurringFlowSchedule | CronFlowSchedule | { type: "never" }

export interface RecurringFlowSchedule {
    type: "recurring"
    interval: string
}

export interface CronFlowSchedule {
    type: "cron"
    expression: string
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

export type TriggerReason = {
    type: "Unknown"
} | {
    type: "Manual"
} | {
    type: "Schedule"
}
