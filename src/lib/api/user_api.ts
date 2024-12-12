import { type ApiProps, authenticatedApiFetch, error_json } from "$lib/api/api";

export async function getRoles(props: ApiProps): Promise<string[]> {
    return authenticatedApiFetch(props, "auth/groups")
        .then(res => {
            if (res.ok) return res.json();
            throw new Error("Failed to fetch roles: " + res.statusText);
        })
        .catch(res => {
            throw new Error("Failed to fetch roles: " + error_json(res).message);
        });
}
