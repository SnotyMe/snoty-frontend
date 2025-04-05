import {
    apiFetch,
    type ApiProps,
    authenticatedApiFetch, type ErrorJson,
    json_or_error,
    type UnauthenticatedApiProps
} from "$lib/api/api";
import {
    descriptorAsString,
    type NodeDescriptor,
    type NodeId,
    type NodeMetadata,
    type NodeMetadataMap,
    type NodeTemplatesMap,
    type StandaloneNode,
    type TemplateMap
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

export type NodeCreateDTO = Omit<StandaloneNode, "_id"> & { flowId: string }
export async function createNode(props: ApiProps, node: NodeCreateDTO): Promise<StandaloneNode> {
    return authenticatedApiFetch(props, `wiring/node/create`, {
        method: "POST",
        body: JSON.stringify(node),
    })
        .then((res) => res.json());
}

export async function updateSettings(props: ApiProps, id: NodeId, settings: Record<string, any>) {
    return authenticatedApiFetch(props, `wiring/node/${id}`, {
        method: "PUT",
        body: JSON.stringify(settings),
    })
        .then((res) => res.json());
}

export async function updateLogLevel(props: ApiProps, id: NodeId, logLevel: string | null) {
    return authenticatedApiFetch(props, `wiring/node/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ logLevel }),
    })
}

export async function deleteNode(props: ApiProps, id: NodeId) {
    return authenticatedApiFetch(props, `wiring/node/${id}`, {
        method: "DELETE",
    })
        .then((res) => res.json());
}

export async function getNodeMetadatas(props: UnauthenticatedApiProps) {
    return apiFetch(props, `wiring/node/metadata`)
        .then((res) => json_or_error(res) as Promise<{ descriptor: NodeDescriptor, metadata: NodeMetadata }[] | ErrorJson>)
        .then((nodes) => {
            if ("error" in nodes) {
                return nodes;
            }

            const map: NodeMetadataMap = new Map<string, NodeMetadata>();
            nodes.forEach(({ descriptor, metadata }) => {
                map.set(descriptorAsString(descriptor), metadata);
            });
            return map;
        });
}

export async function getNodeTemplates(props: UnauthenticatedApiProps) {
    return apiFetch(props, `wiring/node/metadata/template`)
        .then((res) => json_or_error(res) as Promise<{ descriptor: NodeDescriptor, templates: Record<string, string> }[] | ErrorJson>)
        .then((nodes) => {
            if ("error" in nodes) {
                return nodes;
            }

            const map: NodeTemplatesMap = new Map<string, TemplateMap>();
            nodes.forEach(({ descriptor, templates: templatesRecord }) => {
                const templates = new Map<string, string>(Object.entries(templatesRecord));
                map.set(descriptorAsString(descriptor), templates);
            });
            return map;
        });
}
