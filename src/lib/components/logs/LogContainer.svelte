<script lang="ts">
    import { getFlowLogs } from "$lib/api/flow_api";
    import type { NodeId } from "$lib/model/nodes";
    import type { ApiProps } from "$lib/api/api";
    import LogTable from "$lib/components/logs/LogTable.svelte";
    import type { PopupProps } from "$lib/components/node/control";
    import NodePopupContainer from "$lib/components/node/control/NodePopupContainer.svelte";

    interface Props extends PopupProps {
        rootNode: NodeId
        apiProps: ApiProps
    }

    const props: Props = $props();
    const { rootNode, apiProps } = props;
</script>

<NodePopupContainer horizontalAlign="right" width="70%" height="70%" isOpen={props.isOpen}>
    {#await getFlowLogs(apiProps, rootNode)}
        Loading logs...
    {:then logs}
        <LogTable {logs}/>
    {:catch error}
        <p>{error.message}</p>
    {/await}
</NodePopupContainer>
