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
