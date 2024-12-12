import type { NodeField } from "$lib/model/nodes";
import {
    type Details,
    ENUM,
    type EnumConstant,
    enumDetails, objectDetails,
    PLAINTEXT,
    plaintextDetails
} from "$lib/model/node_field_details";

export function getDefaultValue(field: NodeField): any {
    const defaultValue = field.defaultValue
    switch (field.type) {
        case "Enum":
            let constants = enumDetails(field)?.values;
            return constants === undefined ? "" : tryParseEnum(defaultValue, constants) ?? constants[0].value;
        case "Boolean":
            let result = tryParseBoolean(defaultValue);
            return result === undefined ? false : result;
        case "Plaintext":
            return defaultValue ?? "";
        case "Map":
            return {};
        case "Object":
            const details = objectDetails(field)?.schema;
            return details === undefined ? {} : Object.fromEntries(details.map(f => [f.name, getDefaultValue(f)]));
        case "List":
        case "Collection":
            return [];
        default:
            return "";
    }
}

export function getDefaultValueFormattedIfPresent(field: NodeField): any | null {
    switch (field.type) {
        case "Enum":
            return enumDetails(field)!.values[0].displayName;
        case "Boolean":
            return tryParseBoolean(field.defaultValue) ?? false;
        case "Object":
            return objectDetails(field)!.schema.map(f => [f.name, getDefaultValueFormattedIfPresent(f)]);
        default:
            return null;
    }
}

export function getPolyDetails(field: NodeField): Details<any> | undefined {
    let split = field.type;
    switch (split) {
        case ENUM:
            return enumDetails(field);
        case PLAINTEXT:
            return plaintextDetails(field);
        default:
            return undefined;
    }
}

function tryParseEnum(value: string | undefined, constants: EnumConstant[]): string | undefined {
    if (value === undefined) {
        return undefined;
    }
    return constants.find(c => c.value === value)?.value;
}

function tryParseBoolean(value: string | undefined): boolean | undefined {
    switch (value?.toLowerCase()) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            return undefined;
    }
}
