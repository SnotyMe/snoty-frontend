import type { NodeId, NodeMetadata, NodeSettings, SettinglessNode, StandaloneNode } from "$lib/model/nodes";
import { TemplateAPI } from "$lib/components/template/api";
import { config } from "$lib/components/template/config";

const nodeAPI = "nodeAPI";

export function setNodeAPI(nodeId: NodeId, api: { node: SettinglessNode, metadata: NodeMetadata, settings: NodeSettings }) {
    if (window[nodeAPI] === undefined) {
        window[nodeAPI] = {};
    }
    window[nodeAPI][nodeId] = new NodeAPI(api.node, api.metadata, api.settings);
}

export function getNodeAPI(nodeId: NodeId) {
    return window[nodeAPI][nodeId];
}

function getHandlerApiPath(node: SettinglessNode) {
    return `/wiring/nodeapi/${node.descriptor.name}/`
}

function getApiPath(node: SettinglessNode) {
    return `${getHandlerApiPath(node)}/${node._id}/`
}

export function injectNodeUtils(node: StandaloneNode) {
    const handlerApiPath = getHandlerApiPath(node);
    const apiPath = getApiPath(node);
    return {
        ...node,
        handlerApiPath,
        handlerApiUrl: config.apiHost + handlerApiPath,
        apiPath,
        apiUrl: config.apiHost + apiPath,
    };
}

export class NodeAPI {
    readonly node: SettinglessNode;
    readonly metadata: NodeMetadata;
    readonly settings: NodeSettings;

    constructor(node: SettinglessNode, metadata: NodeMetadata, settings: NodeSettings) {
        this.node = node;
        this.metadata = metadata;
        this.settings = settings;
    }

    apiFetch(url: string, init: RequestInit): Promise<Response> {
        return (window.templateAPI as TemplateAPI).backendFetch(`${getApiPath(this.node)}/${url}`, init);
    }
}
