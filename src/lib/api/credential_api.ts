import { type ApiProps, authenticatedApiFetch, type ErrorJson, json_or_error } from "$lib/api/api";
import type { EnumeratedCredentialDto } from "$lib/model/credential";

export async function enumerateCredentials(props: ApiProps, credentialType: string): Promise<EnumeratedCredentialDto[] | ErrorJson> {
    return authenticatedApiFetch(props, `wiring/credential/${credentialType}/enumerate`)
        .then(json_or_error);
}
