import type { NodeSettings } from "$lib/model/nodes";
import { setRecursively } from "$lib/utils/utils";

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
