<script lang="ts">
    import { getFlowExecutions } from "$lib/api/flow_api";
    import type { NodeId } from "$lib/model/nodes";
    import type { ApiProps } from "$lib/api/api";
    import LogTable from "$lib/components/logs/LogTable.svelte";
    import NodeDrawer from "$lib/components/node/control/NodeDrawer.svelte";
    import ExecutionStatusIcon from "../../../routes/flows/ExecutionStatusIcon.svelte";
    import { formatDate } from "$lib/utils/date_utils";

    interface Props {
        isOpen: boolean
        flowId: NodeId
        apiProps: ApiProps
    }
    const { isOpen, flowId, apiProps }: Props = $props();
</script>

<NodeDrawer horizontalAlign="right" width="70%" height="70%" {isOpen} innerClass="overflow-hidden">
    {#await getFlowExecutions(apiProps, flowId)}
        Loading logs...
    {:then executions}
        {#each executions as execution}
            <ExecutionStatusIcon status={execution.status}/>
            {execution.triggeredBy.type} @ {formatDate(execution.startDate)}
            <div class="bg-surface-200-800 p-1 border-2 border-surface-900-100 rounded mb-2">
                <LogTable logs={execution.logs}/>
            </div>
        {/each}
    {:catch error}
        <p>{error.message}</p>
    {/await}
</NodeDrawer>
