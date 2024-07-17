export type NodeId = string
export type Settings = Record<string, any>

export interface StandaloneNode extends Record<string, any>{
    _id: NodeId
    descriptor: NodeDescriptor
    settings: Settings
}

export interface RelationalNode extends StandaloneNode {
    next: RelationalNode[] | null
}

export interface NodeDescriptor {
    subsystem: string
    type: string
}

export interface NodeField {
    name: string
    type: string
    displayName: string
    description: string
    hidden: boolean
    censored: boolean
}

type NodePosition = "START" | "MIDDLE" | "END"

// static metadata that describes a node
export interface NodeMetadata {
    displayName: string
    position: NodePosition
    settings: NodeField[]
    input: NodeField[] | null
    output: NodeField[] | null
}

export type NodeMetadataMap = Map<string, NodeMetadata>

export function descriptorAsString(descriptor: NodeDescriptor): string {
    return descriptor.subsystem + ":" + descriptor.type
}

export function getNodeMetadata(metadatas: NodeMetadataMap, descriptor: NodeDescriptor): NodeMetadata {
    return metadatas.get(descriptorAsString(descriptor))!
}
