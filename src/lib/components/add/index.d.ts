import type { NodeMetadataMap, StandaloneNode } from "$lib/model/nodes";
import type { ApiProps } from "$lib/api/api";
import type { Workflow } from "$lib/model/flows";

export type NodeCreatedHandler = (node: StandaloneNode) => void

interface FlowMenusProps {
    flow: Workflow
    apiProps: ApiProps
    metadatas: NodeMetadataMap
    onnodecreated: NodeCreatedHandler
    isOpen: boolean
}
