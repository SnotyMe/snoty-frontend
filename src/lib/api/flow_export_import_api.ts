import { type ApiProps, authenticatedApiFetch } from "$lib/api/api";
import type { ImportFlowDTO } from "$lib/model/flow_import_export";

export async function importFlow(props: ApiProps, flow: ImportFlowDTO): Promise<string> {
    const res = await authenticatedApiFetch(props, `wiring/flow/import`, {
        method: "POST",
        body: JSON.stringify(flow),
    });
    const content = await res.text();
    if (!res.ok) {
        throw new Error("Failed to import flow: " + content);
    }
    return content;
}
