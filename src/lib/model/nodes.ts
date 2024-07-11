type NodeId = string

export interface FlowNode extends Record<string, any>{
    id: NodeId
    descriptor: NodeDescriptor
    config: Record<string, any>
    next: NodeId[]
}

export interface NodeDescriptor {
    subsystem: string,
    type: string
}

export interface NodeField {
    name: string,
    hidden: boolean,
    censored: boolean,
    descriptive: boolean
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

export function descriptorAsString(descriptor: NodeDescriptor): string {
    return descriptor.subsystem + ":" + descriptor.type
}

export function getNodeMetadata(metadatas: Map<string, NodeMetadata>, descriptor: NodeDescriptor) {
    return metadatas.get(descriptorAsString(descriptor))
}
