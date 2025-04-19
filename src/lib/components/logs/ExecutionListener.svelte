<script lang="ts">
    import { type FlowExecution, FlowExecutionStatus, type TriggerReason } from "$lib/model/flows";
    import { type ApiProps } from "$lib/api/api";
    import type { NodeLogEntry } from "$lib/model/node_logs";
    import { establishListener, type FlowEndedEvent, type FlowExecutionEvent } from "$lib/api/flow_execution_listener";
    import { getToaster } from "$lib/context/layout_context.svelte";

    const {
        apiProps,
        flowId,
        allExecutions = $bindable()
    }: {
        apiProps: ApiProps
        flowId: string,
        allExecutions: FlowExecution[]
    } = $props();

    const evtSource = establishListener(apiProps, flowId, ["FlowStarted", "FlowLog", "FlowEnded"])

    evtSource.addEventListener("FlowStarted", (event) => {
        console.debug("Flow started", event)

        const data: FlowExecutionEvent & {
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
        }: FlowExecutionEvent & {
            entry: NodeLogEntry & {
                timestamp: string | Date | number,
            }
        } = JSON.parse(event.data);

        if (typeof entry.timestamp === "string") entry.timestamp = new Date(entry.timestamp)

        allExecutions.find(ex => ex.jobId === jobId)
            ?.logs.unshift(entry)
    })

    const toaster = getToaster()

    evtSource.addEventListener("FlowEnded", event => {
        console.debug("Flow ended", event)

        const {
            jobId,
            status
        }: FlowEndedEvent = JSON.parse(event.data);

        switch (status) {
            case FlowExecutionStatus.SUCCESS:
                toaster.success({
                    title: "Flow succeeded!",
                })
                break;
            case FlowExecutionStatus.FAILED:
                toaster.error({
                    title: "Flow failed!",
                    description: "Take a look at the journal to figure out why."
                })
                break;
            default:
                console.error("FlowExecutionStatus was neither SUCCESS nor FAILED")
        }

        const found = allExecutions.find(ex => ex.jobId === jobId)
        if (!found) return;

        found.status = status;
    })
</script>