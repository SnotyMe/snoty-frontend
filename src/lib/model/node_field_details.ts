import type { NodeField } from "$lib/model/nodes";

export interface Details<T> {
    type: T
}

function casted<DetailsTypeName, DetailsType>(details: any | null, detailsTypeName: DetailsTypeName): { type: DetailsTypeName } & DetailsType | undefined {
    if (!details) return undefined;

    return {
        ...details as DetailsType | undefined,
        type: detailsTypeName
    } as { type: DetailsTypeName } & DetailsType | undefined;
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
    return casted<TEnum, EnumDetails>(field?.details, ENUM);
}

export const PLAINTEXT = "Plaintext"
type TPlaintext = typeof PLAINTEXT
export interface PlaintextDetails extends Details<TPlaintext> {
    type: TPlaintext
    lines: number
    language?: string
}

export function plaintextDetails(field: NodeField | undefined) {
    return casted<TPlaintext, PlaintextDetails>(field?.details, PLAINTEXT);
}

const INT = "Int"
const LONG = "Long"
export function isNumberType(type: string | undefined): boolean {
    return type === INT || type === LONG;
}

export const OBJECT = "Object"
type TObject = typeof OBJECT
export interface ObjectDetails extends Details<TObject> {
    type: TObject
    className: string
    schema: NodeField[]
}

export function objectDetails(field: NodeField | undefined) {
    return casted<TObject, ObjectDetails>(field?.details, OBJECT);
}

export const COLLECTION = "Collection"
type TCollection = typeof COLLECTION
export interface CollectionDetails extends Details<TCollection> {
    type: TCollection
    elementDetails: Details<any>
}

export function collectionDetails(field: NodeField | undefined) {
    return casted<TCollection, CollectionDetails>(field?.details, COLLECTION);
}
