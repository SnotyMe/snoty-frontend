import type { NodeMetadata, NodeSettings } from "$lib/model/nodes";
import { renameRecursively, setRecursively } from "$lib/utils/settings-utils.svelte";
import { getDefaultValue } from "$lib/model/node_field_details";

export interface SettingsStore {
    settings: NodeSettings;
    setProperty(path: string | null, key: string, value: string): void;
    renameProperty(path: string | null, oldKey: string, newKey: string): void;
    recreate(): void;
}

export function createSettings(initial: NodeSettings): SettingsStore {
    let settings = $state(initial);

    function setProperty(path: string | null, key: string, value: string) {
        settings = setRecursively(settings, path, key, value);
    }

    function renameProperty(path: string | null, oldKey: string, newKey: string) {
        settings = renameRecursively(settings, path, oldKey, newKey);
    }

    return {
        get settings() {
            return settings;
        },
        setProperty,
        renameProperty,
        recreate: () => settings = structuredClone($state.snapshot(settings))
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
