import { getRecursively } from "$lib/utils/utils";
import type { SettingsStore } from "$lib/utils/settings.svelte";

export function getFiltered(settings: SettingsStore, path: string | null) {
    let allValues = Object.entries(getRecursively(settings.settings, path));
    // name and type are special fields in the root settings that are shown exp
    return allValues.filter(([key, _]) => path != null || (key !== "type" && key !== "name"))
}
