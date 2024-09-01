<script lang="ts">
    import { getFlowLogs } from "$lib/api/flow_api";
    import type { NodeId } from "$lib/model/nodes";
    import type { ApiProps } from "$lib/api/api";
    import LogTable from "$lib/components/logs/LogTable.svelte";
    import NodeDrawer from "$lib/components/node/control/NodeDrawer.svelte";

    interface Props {
        isOpen: boolean
        flowId: NodeId
        apiProps: ApiProps
    }
    const { isOpen, flowId, apiProps }: Props = $props();
</script>

<NodeDrawer horizontalAlign="right" width="70%" height="70%" {isOpen}>
    {#await getFlowLogs(apiProps, flowId)}
        Loading logs...
    {:then logs}
        <LogTable {logs}/>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</NodeDrawer>
