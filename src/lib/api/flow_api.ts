import { type ApiProps, authenticatedApiFetch } from "$lib/api/api";
import type { NodeLogEntry } from "$lib/model/node_logs";
import type { Workflow, WorkflowWithNodes } from "$lib/model/flows";

export async function getFlows(props: ApiProps): Promise<Workflow[]> {
    return authenticatedApiFetch(props, "wiring/flow/list")
        .then((res) => res.json());
}

export async function getFlow(props: ApiProps, id: string): Promise<WorkflowWithNodes> {
    return authenticatedApiFetch(props, `wiring/flow/${id}`)
        .then((res) => res.json());
}

export async function getFlowLogs(props: ApiProps, id: string): Promise<NodeLogEntry[]> {
    return authenticatedApiFetch(props, `wiring/flow/${id}/logs`)
        .then((res) => res.json() as Promise<({ timestamp: string } & NodeLogEntry)[]>)
        .then((logs) => logs
            .map(line => (
                {
                    ...line,
                    timestamp: new Date(line.timestamp),
                }
            ))
        );
}
