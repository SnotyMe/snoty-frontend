import type { NodeField, NodeMetadata, NodeSettings } from "$lib/model/nodes";
import { getDefaultValue } from "$lib/model/node_field_defaults";

export function nodeSettingsFromMetadata(nodeMetadata: NodeMetadata): NodeSettings {
    const fields = nodeMetadata.settings;

    const settings: NodeSettings = {};
    for (const field of fields) {
        settings[field.name] = getDefaultValue(field);
    }
    settings.name = nodeMetadata.displayName;
    return settings;
}

export function removeBoilerplate(fields: NodeField[], fieldsToRemove?: string[]): NodeField[] {
    return fields
        .filter((field) => field.name !== "type" && field.name !== "name")
        .filter((field) => !fieldsToRemove?.includes(field.name));
}
