import type { NodeMetadata, NodeSettings } from "$lib/model/nodes";
import { deleteRecursively, renameRecursively, setRecursively } from "$lib/utils/settings-utils.svelte";
import { getDefaultValue } from "$lib/model/node_field_details";

export interface SettingsStore {
    settings: NodeSettings;
    setProperty(pathKey: string[], value: string): void;
    renameProperty(pathKey: string[], newKey: string): void;
    deleteProperty(pathKey: string[]): void;
    recreate(): void;
}

export function createSettings(
    initial: NodeSettings,
    onsettingschange?: (settings: NodeSettings) => void,
): SettingsStore {
    let settings = $state(initial);

    function setProperty(pathKey: string[], value: string) {
        settings = setRecursively(settings, pathKey, value);
        onsettingschange?.(settings);
    }

    function renameProperty(pathKey: string[], newKey: string) {
        settings = renameRecursively(settings, pathKey, newKey);
        onsettingschange?.(settings);
    }

    function deleteProperty(pathKey: string[]) {
        settings = deleteRecursively(settings, pathKey);
        onsettingschange?.(settings);
    }

    return {
        get settings() {
            return settings;
        },
        setProperty,
        renameProperty,
        deleteProperty,
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
