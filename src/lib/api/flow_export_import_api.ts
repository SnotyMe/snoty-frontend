import { type ApiProps, authenticatedApiFetch } from "$lib/api/api";
import type { ImportFlowDTO } from "$lib/model/flow_import_export";

export async function importFlow(props: ApiProps, flow: ImportFlowDTO): Promise<string> {
    const res = await authenticatedApiFetch(props, `wiring/flow/import`, {
        method: "POST",
        body: JSON.stringify(flow),
    });
    return await res.text();
}
