import type { StandaloneNode, RelationalNode } from "$lib/model/nodes";
import { authenticatedApiFetch, type Fetch } from "$lib/api/api";

export async function getFlows(token: string, fetch: Fetch): Promise<StandaloneNode[]> {
    return authenticatedApiFetch(token, "wiring/flow/list", fetch)
        .then((res) => res.json());
}

export async function getFlow(token: string, fetch: Fetch, id: string): Promise<RelationalNode[]> {
    return authenticatedApiFetch(token, `wiring/flow/${id}`, fetch)
        .then((res) => res.json());
}
