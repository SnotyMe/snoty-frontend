import type { NodeDescriptor } from "$lib/model/nodes"
import type { WorkflowSettings } from "$lib/model/flows";

export interface ExportedFlow {
    templateName: string
    settings?: WorkflowSettings
    nodes: ExportedNode[]
}

export interface ExportedNode {
    id: string
    name: string
    descriptor: NodeDescriptor
    settings: Record<string, any | CensoredField>
    next: string[]
}

export interface CensoredField {
    censored: true
}

export interface ImportNodeDTO {
    id: string
    descriptor: NodeDescriptor
    settings: Record<string, any>
    next: string[]
}

export interface ImportFlowDTO {
    name: String
    settings?: WorkflowSettings
    nodes: ImportNodeDTO[]
}
