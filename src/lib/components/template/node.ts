import type { NodeId, NodeMetadata, SettinglessNode } from "$lib/model/nodes";
import type { SettingsStore } from "$lib/utils/settings.svelte";

const nodeAPI = "nodeAPI";

export function setNodeAPI(nodeId: NodeId, api: { node: SettinglessNode, metadata: NodeMetadata, settings: SettingsStore }) {
    if (window[nodeAPI] === undefined) {
        window[nodeAPI] = {};
    }
    window[nodeAPI][nodeId] = api
}

export function getNodeAPI(nodeId: NodeId) {
    return window[nodeAPI][nodeId];
}
