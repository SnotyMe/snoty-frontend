import type { ImportFlowDTO, ImportNodeDTO } from "$lib/model/flow_import_export";
import type { SettingsStore } from "$lib/utils/settings.svelte";

export function replaceAllCensoredWithDefault(obj: Record<string, any>) {
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "object") {
            if (obj[key]["censored"] === true) {
                obj[key] = obj[key]["default"] ??= ""
                return
            }
            replaceAllCensoredWithDefault(obj[key])
        }
    })
    return obj
}

export type FlowWithSettingsStore = {
    nodes: (Omit<ImportNodeDTO, "settings"> & {
        settingsStore: SettingsStore
    })[]
} & ImportFlowDTO
