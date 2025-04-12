import type { Details } from "$lib/model/node_field_details";
import type { LogLevel } from "$lib/model/node_logs";

export type NodeId = string
export type NodeSettings = Record<string, any>

export interface SettinglessNode extends Record<string, any> {
    _id: NodeId
    descriptor: NodeDescriptor
    logLevel: LogLevel | null
}

export interface StandaloneNode extends SettinglessNode {
    settings: NodeSettings
}

export interface FlowNode extends StandaloneNode {
    next: NodeId[] | null
}

export interface NodeDescriptor {
    namespace: string
    name: string
}

export interface NodeField {
    name: string
    type: string
    defaultValue?: any
    displayName: string
    description: string
    hidden: boolean
    censored: boolean
    details?: Details
}

type NodePosition = "START" | "MIDDLE" | "END"

// static metadata that describes a node
export interface NodeMetadata {
    descriptor: NodeDescriptor
    displayName: string
    position: NodePosition
    settings: NodeField[]
    input: NodeField[] | null
    output: NodeField[] | null
}

export type NodeMetadataMap = Map<string, NodeMetadata>

export function descriptorAsString(descriptor: NodeDescriptor): string {
    return descriptor.namespace + ":" + descriptor.name;
}

export function getNodeMetadata(metadatas: NodeMetadataMap, descriptor: NodeDescriptor): NodeMetadata {
    return metadatas.get(descriptorAsString(descriptor))!;
}

/**
 * template name -> template
 */
export type TemplateMap = Map<string, string>
/**
 * descriptor -> templates
 */
export type NodeTemplatesMap = Map<string, TemplateMap>

export function getNodeTemplates(templates: NodeTemplatesMap, descriptor: NodeDescriptor): TemplateMap {
    return templates.get(descriptorAsString(descriptor))!;
}
