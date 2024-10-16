import type { NodeField } from "$lib/model/nodes";

export interface Details<T> {
    type: T
}

function casted<DetailsTypeName, DetailsType>(details: any | null, detailsTypeName: DetailsTypeName): { type: DetailsTypeName } & DetailsType | undefined {
    if (!details) return undefined

    return {
        ...details as DetailsType | undefined,
        type: detailsTypeName
    } as { type: DetailsTypeName } & DetailsType | undefined
}

export const ENUM = "Enum"
type TEnum = typeof ENUM
export interface EnumDetails extends Details<TEnum> {
    type: TEnum
    values: EnumConstant[]
}

export interface EnumConstant {
    value: string
    displayName: string
}

export function enumDetails(field: NodeField | undefined) {
    return casted<TEnum, EnumDetails>(field?.details, ENUM)
}

export const PLAINTEXT = "Plaintext"
type TPlaintext = typeof PLAINTEXT
export interface PlaintextDetails extends Details<TPlaintext> {
    type: TPlaintext
    lines: number
}

export function plaintextDetails(field: NodeField | undefined) {
    return casted<TPlaintext, PlaintextDetails>(field?.details, PLAINTEXT)
}

const INT = "Int"
const LONG = "Long"
export function isNumberType(type: string | undefined): boolean {
    return type === INT || type === LONG
}

export function getDefaultValue(field: NodeField): any {
    const defaultValue = field.defaultValue
    switch (field.type) {
        case "Enum":
            let constants = enumDetails(field)?.values;
            return constants === undefined ? "" : tryParseEnum(defaultValue, constants) ?? constants[0].value
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

export function getDefaultValueFormattedIfPresent(field: NodeField): any | null {
    switch (field.type) {
        case "Enum":
            return enumDetails(field)!.values[0].displayName
        case "Boolean":
            return tryParseBoolean(field.defaultValue) ?? false
        default:
            return null
    }
}

export function getPolyDetails(field: NodeField): Details<any> | undefined {
    let split = field.type;
    switch (split) {
        case ENUM:
            return enumDetails(field)
        case PLAINTEXT:
            return plaintextDetails(field)
        default:
            return undefined
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
