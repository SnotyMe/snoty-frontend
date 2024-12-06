import type { NodeId, NodeMetadata, SettinglessNode } from "$lib/model/nodes";
import type { SettingsStore } from "$lib/utils/settings.svelte";
import { TemplateAPI } from "$lib/components/template/api";

const nodeAPI = "nodeAPI";

export function setNodeAPI(nodeId: NodeId, api: { node: SettinglessNode, metadata: NodeMetadata, settings: SettingsStore }) {
    if (window[nodeAPI] === undefined) {
        window[nodeAPI] = {};
    }
    window[nodeAPI][nodeId] = new NodeAPI(api.node, api.metadata, api.settings);
}

export function getNodeAPI(nodeId: NodeId) {
    return window[nodeAPI][nodeId];
}

export class NodeAPI {
    readonly node: SettinglessNode;
    readonly metadata: NodeMetadata;
    readonly settings: SettingsStore;

    constructor(node: SettinglessNode, metadata: NodeMetadata, settings: SettingsStore) {
        this.node = node;
        this.metadata = metadata;
        this.settings = settings;
    }

    apiFetch(url: string, init: RequestInit): Promise<Response> {
        return (window.templateAPI as TemplateAPI).backendFetch(`wiring/node/${this.node._id}/${url}`, init);
    }
}
