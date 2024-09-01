import type { NodeId, NodeMetadataMap, StandaloneNode } from "$lib/model/nodes";
import type { ApiProps } from "$lib/api/api";

export type NodeCreatedHandler = (node: StandaloneNode) => void

interface AddNodeProps {
    flowId: NodeId
    apiProps: ApiProps
    metadatas: NodeMetadataMap
    onnodecreated: NodeCreatedHandler
    isOpen: boolean
}
