import { type ApiProps, authenticatedApiFetch } from "$lib/api/api";
import {
    descriptorAsString,
    type NodeDescriptor,
    type NodeMetadata,
    type NodeMetadataMap,
    type StandaloneNode
} from "$lib/model/nodes";

export const disconnectNodes = async (props: ApiProps, from_id: string, to_id: string): Promise<void> =>
    await updateNodeConnection(props, "disconnect", from_id, to_id)

export const connectNodes = async (props: ApiProps, from_id: string, to_id: string): Promise<void> =>
    updateNodeConnection(props, "connect", from_id, to_id)

async function updateNodeConnection(props: ApiProps, action: "connect" | "disconnect", from_id: string, to_id: string): Promise<void> {
    return authenticatedApiFetch(props, `wiring/node/${action}`, {
        method: "PUT",
        body: JSON.stringify({ from: from_id, to: to_id }),
    })
        .then((res) => res.json());
}

export type NodeCreateDTO = Omit<StandaloneNode, "_id">
export async function createNode(props: ApiProps, node: NodeCreateDTO): Promise<StandaloneNode> {
    return authenticatedApiFetch(props, `wiring/node/create`, {
        method: "POST",
        body: JSON.stringify(node),
    })
        .then((res) => res.json());
}

export async function updateSettings(props: ApiProps, id: string, settings: Record<string, any>) {
    return authenticatedApiFetch(props, `wiring/node/${id}`, {
        method: "PUT",
        body: JSON.stringify(settings),
    })
        .then((res) => res.json());
}

export async function nodeMetadata(props: ApiProps) {
    return authenticatedApiFetch(props, `wiring/node/list`)
        .then((res) => res.json() as Promise<{ descriptor: NodeDescriptor, metadata: NodeMetadata }[]>)
        .then((nodes) => {
            const map: NodeMetadataMap = new Map<string, NodeMetadata>();
            nodes.forEach(({ descriptor, metadata }) => {
                map.set(descriptorAsString(descriptor), metadata);
            });
            return map;
        });
}
