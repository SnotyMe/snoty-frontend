import { type ApiProps, authenticatedApiFetch, type ErrorJson, json_or_error } from "$lib/api/api";
import type { Role } from "$lib/model/user";

export async function getRoles(props: ApiProps): Promise<Role[] | ErrorJson> {
    return authenticatedApiFetch(props, "auth/roles")
        .then(json_or_error)
}
