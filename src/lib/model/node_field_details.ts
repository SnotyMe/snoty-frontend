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
