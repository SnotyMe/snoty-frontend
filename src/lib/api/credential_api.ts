import { type ApiProps, authenticatedApiFetch, type ErrorJson, json_or_error } from "$lib/api/api";
import type {
    CredentialDto,
    CredentialDefinitionWithStatisticsDto,
    CredentialCreateDto,
    CredentialUpdateDto
} from "$lib/model/credential";

export async function getCredential(props: ApiProps, credentialId: string): Promise<CredentialDto | ErrorJson> {
    return authenticatedApiFetch(props, `wiring/credential/${credentialId}`)
        .then(json_or_error);
}

export async function credentialsOverview(props: ApiProps): Promise<CredentialDefinitionWithStatisticsDto[] | ErrorJson> {
    return authenticatedApiFetch(props, `wiring/credential/overview`)
        .then(json_or_error);
}

export async function listCredentials(props: ApiProps, credentialType: string): Promise<CredentialDto[] | ErrorJson> {
    return authenticatedApiFetch(props, `wiring/credential/${credentialType}/list`)
        .then(json_or_error);
}

export async function enumerateCredentials(props: ApiProps, credentialType: string): Promise<CredentialDto[] | ErrorJson> {
    return authenticatedApiFetch(props, `wiring/credential/${credentialType}/enumerate`)
        .then(json_or_error);
}

export async function createCredential(props: ApiProps, credentialCreateDto: CredentialCreateDto): Promise<CredentialDto | ErrorJson> {
    return authenticatedApiFetch(props, `wiring/credential`, {
        method: "POST",
        body: JSON.stringify(credentialCreateDto),
    }).then(json_or_error);
}

export async function updateCredential(props: ApiProps, credentialId: string, credentialUpdateDto: Omit<CredentialUpdateDto, "type">): Promise<CredentialDto | ErrorJson> {
    return authenticatedApiFetch(props, `wiring/credential/${credentialId}`, {
        method: "PUT",
        body: JSON.stringify(credentialUpdateDto),
    }).then(json_or_error);
}

export async function deleteCredential(props: ApiProps, credentialId: string): Promise<void | ErrorJson> {
    return authenticatedApiFetch(props, `wiring/credential/${credentialId}`, {
        method: "DELETE",
    }).then(res => {
        if (res.ok) return;
        else return json_or_error(res);
    });
}
