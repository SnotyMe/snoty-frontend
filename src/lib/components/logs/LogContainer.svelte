<script lang="ts">
    import { getFlowLogs } from "$lib/api/flow_api";
    import type { NodeId } from "$lib/model/nodes";
    import type { ApiProps } from "$lib/api/api";
    import LogTable from "$lib/components/logs/LogTable.svelte";
    import NodeDrawer from "$lib/components/node/control/NodeDrawer.svelte";
    import { getAllLogs } from "$lib/utils/logs.svelte";
    import type { NodeLogEntry } from "$lib/model/node_logs";

    interface Props {
        isOpen: boolean
        flowId: NodeId
        apiProps: ApiProps
    }
    const { isOpen, flowId, apiProps }: Props = $props();

    const { logs, setLogs } = getAllLogs()

    async function getAndSetFlowLogs(apiProps: ApiProps, flowId: NodeId): Promise<NodeLogEntry[] | null> {
        if (logs === null || logs.length == 0) {
            const flowLogs = await getFlowLogs(apiProps, flowId);
            setLogs(flowLogs);
            return flowLogs;
        }
        return logs;
    }
</script>

<NodeDrawer horizontalAlign="right" width="70%" height="70%" {isOpen}>
    {#await getAndSetFlowLogs(apiProps, flowId)}
        Loading logs...
    {:then logs}
        {#if logs == null || logs.length === 0}
            <p>No logs available</p>
        {:else}
            <LogTable {logs}/>
        {/if}
    {:catch error}
        <p>{error.message}</p>
    {/await}
</NodeDrawer>
