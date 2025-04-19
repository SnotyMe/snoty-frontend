<script lang="ts">
    import { FlowExecutionStatus } from "$lib/model/flows";
    import type { FlowEndedEvent, FlowExecutionEvent } from "$lib/api/flow_execution_listener";

    interface Props {
        status: FlowExecutionStatus
        flowId?: string
        statusListener?: EventSource
    }

    let {
        status: statusInput,
        flowId,
        statusListener,
    }: Props = $props();

    let status = $state(statusInput);

    statusListener?.addEventListener("FlowStarted", (event) => {
        const data: FlowExecutionEvent = JSON.parse(event.data);
        if (data.flowId !== flowId) return;
        console.debug("Received FlowStarted event", data);
        status = FlowExecutionStatus.RUNNING;
    })

    statusListener?.addEventListener("FlowEnded", (event) => {
        const data: FlowEndedEvent = JSON.parse(event.data);
        if (data.flowId !== flowId) return;
        console.debug("Received FlowEnded event", data);
        status = data.status;
    })
</script>

<style>
    span {
        font-size: 1rem;
        width: 1rem;
        text-align: center;
    }
</style>

{#if status === FlowExecutionStatus.SUCCESS}
    <span class="text-green-500">✓</span>
{:else if status === FlowExecutionStatus.FAILED}
    <span class="text-red-500">✗</span>
{:else if status === FlowExecutionStatus.RUNNING}
    <span class="text-orange-500 dark:text-yellow-400">⚙</span>
{:else}
    <span class="text-gray-500">?</span>
{/if}
