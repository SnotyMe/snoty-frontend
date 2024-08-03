<script lang="ts">
    import { getFlowLogs } from "$lib/api/flow_api.js";
    import type { NodeId } from "$lib/model/nodes.js";
    import type { ApiProps } from "$lib/api/api.js";
    import LogTable from "$lib/components/logs/LogTable.svelte";

    interface Props {
        isOpen: boolean
        rootNode: NodeId
        apiProps: ApiProps
    }

    const { isOpen, rootNode, apiProps }: Props = $props();
</script>

<style>
    #container {
        position: absolute;
        --top-padding: calc(var(--flow-control-padding) * 2 + var(--flow-control-button-size));
        top: var(--top-padding);
        --x-padding: var(--flow-control-padding);
        right: var(--x-padding);

        width: 70%;
        height: 70%;
        max-width: calc(100% - 2 * var(--x-padding));
        max-height: calc(100% - var(--top-padding) - var(--flow-control-padding));

        resize: both;
        /* moves the handle to the bottom left */
        direction: rtl;

        & > div {
            /* reset direction back to ltr */
            direction: ltr;
            height: 100%;
            overflow-y: scroll;
        }
    }
</style>

<div class:hidden={!isOpen}
     id="container"
     class="text-sm z-10 flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800 overflow-hidden block border">
    <div>
        {#await getFlowLogs(apiProps, rootNode)}
            Loading logs...
        {:then logs}
            <LogTable {logs}/>
        {:catch error}
            <p>{error.message}</p>
        {/await}
    </div>
</div>
