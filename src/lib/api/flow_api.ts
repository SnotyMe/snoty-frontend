import { type ApiProps, authenticatedApiFetch } from "$lib/api/api";
import type { NodeLogEntry } from "$lib/model/node_logs";
import type { EnumeratedFlowExecution, FlowExecution, Workflow, WorkflowWithNodes } from "$lib/model/flows";

export type CreateFlowDTO = { name: string };
export async function createFlow(props: ApiProps, flow: CreateFlowDTO): Promise<Workflow> {
    return authenticatedApiFetch(props, "wiring/flow", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(flow),
    })
        .then((res) => res.json());
}

export async function getFlows(props: ApiProps): Promise<Workflow[]> {
    return authenticatedApiFetch(props, "wiring/flow/list")
        .then((res) => res.json());
}

export async function enumerateFlowExecutions(props: ApiProps): Promise<EnumeratedFlowExecution[]> {
    return authenticatedApiFetch(props, "wiring/flow/list/executions")
        .then((res) => res.json());
}

export async function getFlow(props: ApiProps, id: string): Promise<WorkflowWithNodes> {
    return authenticatedApiFetch(props, `wiring/flow/${id}`)
        .then((res) => res.json());
}

export async function renameFlow(props: ApiProps, id: string, name: string): Promise<Response> {
    return authenticatedApiFetch(props, `wiring/flow/${id}/rename`, {
        method: "PUT",
        body: name,
    })
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
            .toSorted((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
        );
}

export async function getFlowExecutions(props: ApiProps, id: string, startFrom: null | String = null): Promise<FlowExecution[]> {
    return authenticatedApiFetch(props, `wiring/flow/${id}/executions?startFrom=${startFrom ?? ""}`)
        .then((res) => res.json() as Promise<({ startDate: string, logs: ({ timestamp: string } & NodeLogEntry)[] } & FlowExecution)[]>)
        .then((executions) => executions.map(execution => (
                {
                    ...execution,
                    startDate: new Date(execution.startDate),
                    logs: execution.logs.map(line => (
                        {
                            ...line,
                            timestamp: new Date(line.timestamp),
                        }
                    )),
                }
            ))
                .toSorted((a, b) => b.startDate.getTime() - a.startDate.getTime())
        );
}

export async function triggerFlow(props: ApiProps, id: string) {
    return authenticatedApiFetch(props, `wiring/flow/${id}/trigger`, {
        method: "POST",
    });
}

export async function deleteFlow(props: ApiProps, id: string) {
    return authenticatedApiFetch(props, `wiring/flow/${id}`, {
        method: "DELETE",
    });
}
