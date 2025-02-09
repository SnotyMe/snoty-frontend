import { type ApiProps, authenticatedApiFetch, error_json } from "$lib/api/api";
import type { ImportFlowDTO } from "$lib/model/flow_import_export";
import type { NodeId } from "$lib/model/nodes";

export interface ExportOptions {
    withSensitiveData: boolean
}

export async function exportFlow(props: ApiProps, flowId: NodeId, options: ExportOptions) {
    return await authenticatedApiFetch(props, `wiring/flow/${flowId}/export`, {
        method: "POST",
        body: JSON.stringify(options),
    })
        .then(async (res) => {
            if (res.ok) return res.blob()

            return error_json(await res.json());
        });
}

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
