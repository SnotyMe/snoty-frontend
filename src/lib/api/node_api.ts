import { type ApiProps, authenticatedApiFetch } from "$lib/api/api";

export async function disconnectNodes(props: ApiProps, from_id: string, to_id: string): Promise<void> {
    return authenticatedApiFetch(props, `wiring/node/disconnect`, {
        method: "PUT",
        body: JSON.stringify({ from: from_id, to: to_id }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((res) => res.json());
}
