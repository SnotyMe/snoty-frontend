<script lang="ts">
    import { type FlowExecution, FlowExecutionStatus, type TriggerReason } from "$lib/model/flows";
    import { API_URL, type ApiProps, injectAuth } from "$lib/api/api";
    import type { NodeLogEntry } from "$lib/model/node_logs";
    import { EventSource } from "eventsource";

    const {
        apiProps,
        flowId,
        allExecutions = $bindable()
    }: {
        apiProps: ApiProps
        flowId: string,
        allExecutions: FlowExecution[]
    } = $props();

    const evtSource = new EventSource(`${API_URL}/wiring/flow/${flowId}/executions/sse`, {
        fetch: (input, init) => fetch(input, injectAuth(apiProps, init))
    });

    interface Event {
        jobId: string
        flowId: string
    }

    evtSource.addEventListener("FlowStarted", (event) => {
        console.debug("Flow started", event)

        const data: Event & {
            triggeredBy: TriggerReason
            timestamp: string
        } = JSON.parse(event.data)

        allExecutions.unshift({
            ...data,
            logs: [],
            startDate: new Date(data.timestamp),
            status: FlowExecutionStatus.RUNNING,
        })
    })

    evtSource.addEventListener("FlowLog", event => {
        console.debug("Flow log", event)

        const {
            jobId,
            entry,
        }: Event & {
            entry: NodeLogEntry & {
                timestamp: string | Date | number,
            }
        } = JSON.parse(event.data);

        if (typeof entry.timestamp === "string") entry.timestamp = new Date(entry.timestamp)

        allExecutions.find(ex => ex.jobId === jobId)
            ?.logs.unshift(entry)
    })

    evtSource.addEventListener("FlowEnded", event => {
        console.debug("Flow ended", event)

        const {
            jobId,
            status
        }: Event & {
            status: FlowExecutionStatus,
        } = JSON.parse(event.data);

        const found = allExecutions.find(ex => ex.jobId === jobId)
        if (!found) return;

        found.status = status;
    })
</script>