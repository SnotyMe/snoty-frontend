export interface CredentialRef {
    credentialId: string | null
}

enum CredentialAccess {
    USER = "USER",
    SYSTEM = "SYSTEM",
}

export interface EnumeratedCredentialDto {
    id: string,
    name: String,
    access: CredentialAccess
}
