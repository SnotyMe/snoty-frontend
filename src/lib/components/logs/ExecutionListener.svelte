<script lang="ts">
    import { type FlowExecution, FlowExecutionStatus } from "$lib/model/flows";
    import { API_URL } from "$lib/api/api";

    interface FlowStarted {
        jobId: string,
        flowId: string,
        // TODO: create FlowTriggerReason type
        triggeredBy: any,
    }

    let {
        flowId,
        allExecutions = $bindable()
    }: {
        flowId: string,
        allExecutions: FlowExecution[]
    } = $props();

    const evtSource = new EventSource(`${API_URL}/wiring/flow/${flowId}/executions/sse`, {
        withCredentials: true,
    });
    evtSource.addEventListener("FlowStarted", (event) => {
        console.debug("Flow started", event)
        const data: FlowStarted =  JSON.parse(event.data)

        allExecutions = [{
            ...data,
            logs: [],
            // TODO
            startDate: new Date(),
            status: FlowExecutionStatus.RUNNING,
        }, ...allExecutions]
    })
    evtSource.addEventListener("FlowStarted", (event) => {
        console.debug("Flow started", event)
        const data: FlowStarted =  JSON.parse(event.data)

        allExecutions = [{
            ...data,
            logs: [],
            // TODO
            startDate: new Date(),
            status: FlowExecutionStatus.RUNNING,
        }, ...allExecutions]
    })
</script>