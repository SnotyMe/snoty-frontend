import type { RelationalNode, StandaloneNode } from "$lib/model/nodes";
import { type ApiProps, authenticatedApiFetch } from "$lib/api/api";

export async function getFlows(props: ApiProps): Promise<StandaloneNode[]> {
    return authenticatedApiFetch(props, "wiring/flow/list")
        .then((res) => res.json());
}

export async function getFlow(props: ApiProps, id: string): Promise<RelationalNode[]> {
    return authenticatedApiFetch(props, `wiring/flow/${id}`)
        .then((res) => res.json());
}
