type NodeId = string

export interface StandaloneNode extends Record<string, any>{
    _id: NodeId
    descriptor: NodeDescriptor
    settings: Record<string, any>
}

export interface RelationalNode extends StandaloneNode {
    next: RelationalNode[] | null
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
