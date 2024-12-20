import { type ApiProps, authenticatedApiFetch, type ErrorJson, json_or_error } from "$lib/api/api";

export async function getRoles(props: ApiProps): Promise<string[] | ErrorJson> {
    return authenticatedApiFetch(props, "auth/groups")
        .then(json_or_error)
}
