import { type ApiProps, authenticatedApiFetch } from "$lib/api/api";
import { descriptorAsString, type NodeDescriptor, type NodeMetadata, type NodeMetadataMap } from "$lib/model/nodes";

export async function disconnectNodes(props: ApiProps, from_id: string, to_id: string): Promise<void> {
    return authenticatedApiFetch(props, `wiring/node/disconnect`, {
        method: "PUT",
        body: JSON.stringify({ from: from_id, to: to_id }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json());
}

export async function updateSettings(props: ApiProps, id: string, settings: Record<string, any>) {
    return authenticatedApiFetch(props, `wiring/node/${id}`, {
        method: "PUT",
        body: JSON.stringify(settings),
        headers: {
            "Content-Type": "application/json"
        }
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
