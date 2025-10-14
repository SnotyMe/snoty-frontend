import type { NodeField, NodeMetadata, NodeSettings } from "$lib/model/nodes";
import { getDefaultValue } from "$lib/model/node_field_defaults";

export function nodeSettingsFromMetadata(nodeMetadata: NodeMetadata): NodeSettings {
    return {
        ...defaultRecordFromSchema(nodeMetadata.settings),
        name: nodeMetadata.displayName,
    };
}

export function defaultRecordFromSchema(fields: NodeField[]): Record<string, any> {
    const record: Record<string, any> = {};
    for (const field of fields) {
        record[field.name] = getDefaultValue(field);
    }
    return record;
}

export function removeBoilerplate(fields: NodeField[], fieldsToRemove?: string[]): NodeField[] {
    return fields
        .filter((field) => field.name !== "type" && field.name !== "name")
        .filter((field) => !fieldsToRemove?.includes(field.name));
}
