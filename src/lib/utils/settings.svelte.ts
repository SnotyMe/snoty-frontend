import type { NodeMetadata, NodeSettings } from "$lib/model/nodes";
import { setRecursively } from "$lib/utils/utils";
import { getDefaultValue } from "$lib/model/node_field_details";

export interface SettingsStore {
    settings: NodeSettings;
    setProperty(key: string, value: string): void;
}

export function createSettings(initial: NodeSettings): SettingsStore {
    let settings = $state(initial);

    function setProperty(key: string, value: string) {
        settings = setRecursively(settings, key, value);
    }

    return {
        get settings() {
            return settings;
        },
        setProperty
    };
}

export function nodeSettingsFromMetadata(nodeMetadata: NodeMetadata): NodeSettings {
    const fields = nodeMetadata.settings

    const settings: NodeSettings = {}
    for (const field of fields) {
        settings[field.name] = getDefaultValue(field);
    }
    settings.name = nodeMetadata.displayName
    return settings;
}
