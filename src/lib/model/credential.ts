import type { NodeField } from "$lib/model/nodes";
import type { Role } from "$lib/model/user";

export interface CredentialRef {
    credentialId: string | null
}

export enum CredentialScope {
    USER = "USER",
    ROLE = "ROLE",
    GLOBAL = "GLOBAL",
}

export interface CredentialDefinition {
    type: string;
    schema: NodeField[];
}

export interface CredentialDefinitionWithStatisticsDto extends CredentialDefinition {
    displayName: string
    count: number
}

export interface CredentialDto {
    credentialType: string
    scope: CredentialScope
    id: string
    requiredRole: Role | null
    name: string
    data?: Record<string, any>
}

export interface CredentialCreateDto {
    type: string
    name: string
    role: Role | null
    data: Record<string, any>
}

export interface CredentialUpdateDto {
    name: string
    data: Record<string, any>
}
