import type { NodeField } from "$lib/model/nodes";

export interface CredentialRef {
    credentialId: string | null
}

export enum CredentialAccess {
    USER = "USER",
    SYSTEM = "SYSTEM",
}

export interface CredentialDefinitionWithStatisticsDto {
    type: string
    displayName: string
    schema: NodeField[]
    count: number
}

export interface CredentialDto {
    credentialType: string
    access: CredentialAccess
    id: string
    name: string
    data: Record<string, any>
}

export interface CredentialCreateDto {
    type: string
    name: string
    data: Record<string, any>
}

export interface CredentialUpdateDto {
    name: string
    data: Record<string, any>
}
