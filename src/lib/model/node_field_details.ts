import type { NodeField } from "$lib/model/nodes";

export interface Details {}

export interface EnumDetails extends Details {
    values: EnumConstant[]
}

export interface EnumConstant {
    value: string
    displayName: string
}

export function enumDetails(field: NodeField | undefined) {
    return field!.details as EnumDetails
}

export interface PlaintextDetails extends Details {
    lines: number
}

export function plaintextDetails(field: NodeField | undefined) {
    return field?.details as PlaintextDetails | undefined
}

export function getDefaultValue(field: NodeField): any {
    const defaultValue = field.defaultValue
    switch (field.type) {
        case "Enum":
            let constants = enumDetails(field).values;
            return tryParseEnum(defaultValue, constants) ?? constants[0].value
        case "Boolean":
            let result = tryParseBoolean(defaultValue);
            return result === undefined ? false : result;
        case "Plaintext":
            return defaultValue ?? ""
        case "Map":
            return {}
        case "List":
            return []
        default:
            return ""
    }
}

function tryParseEnum(value: string | undefined, constants: EnumConstant[]): string | undefined {
    if (value === undefined) {
        return undefined
    }
    return constants.find(c => c.value === value)?.value
}

function tryParseBoolean(value: string | undefined): boolean | undefined {
    switch (value?.toLowerCase()) {
        case "true":
            return true
        case "false":
            return false
        default:
            return undefined
    }
}
