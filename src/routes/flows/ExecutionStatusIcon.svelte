<script lang="ts">
    import { FlowExecutionStatus } from "$lib/model/flows";

    interface Props {
        status: FlowExecutionStatus
    }
    const {
        status,
    }: Props = $props()
</script>

<style>
    span {
        font-size: 1.5rem;
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
