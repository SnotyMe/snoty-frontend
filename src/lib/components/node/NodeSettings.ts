import { getRecursively } from "$lib/utils/settings-utils.svelte";
import type { SettingsStore } from "$lib/utils/settings.svelte";

export function getFiltered(settings: SettingsStore, path: string[], excludedFields: string[]) {
    const subobj = getRecursively(settings.settings, path) ?? {};
    const allValues = Object.entries(subobj);
    // name and type are special fields in the root settings that are shown exp
    return allValues
        .filter(([key, _]) => !excludedFields.includes(key))
        .filter(([key, _]) => path.length > 0 || (key !== "type" && key !== "name"))
}
