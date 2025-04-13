import { API_URL, type ApiProps, injectAuth } from "$lib/api/api";
import { EventSource } from "eventsource";
import { FlowExecutionStatus } from "$lib/model/flows";

export interface FlowExecutionEvent {
    jobId: string
    flowId: string
}

export interface FlowEndedEvent extends FlowExecutionEvent{
    status: FlowExecutionStatus
}

export function establishListener(
    apiProps: ApiProps,
    flowId: string,
    eventTypes: ("FlowStarted" | "FlowLog" | "FlowEnded")[],
) {
    const url = `${API_URL}/wiring/flow/${flowId}/executions/sse?eventTypes=${eventTypes.join(",")}`;
    return new EventSource(url, {
        fetch: (input, init) => fetch(input, injectAuth(apiProps, init))
    });
}