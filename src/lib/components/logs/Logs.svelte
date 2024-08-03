<script lang="ts">
    import type { NodeId } from "$lib/model/nodes";
    import { ControlButton, Panel } from "@xyflow/svelte";
    import IconOpenLogs from "lucide-svelte/icons/scroll-text";
    import IconCloseLogs from "lucide-svelte/icons/scroll";
    import type { ApiProps } from "$lib/api/api";
    import LogContainer from "$lib/components/logs/LogContainer.svelte";

    interface Props {
        rootNode: NodeId
        apiProps: ApiProps
    }

    const props: Props = $props();

    let isOpen = $state(false);

    function showLogs() {
        isOpen = !isOpen;
    }
</script>

<style>
    /* fixes weird SVG artifacts */
    :global(.svelte-flow__controls-showlogs svg) {
        fill: none;
    }
</style>

<Panel position="top-right">
    <slot name="before">
        <ControlButton
                on:click={showLogs}
                class="svelte-flow__controls-showlogs"
                title="show logs"
                aria-label="show logs"
        >
            {#if isOpen}
                <IconOpenLogs/>
            {:else}
                <IconCloseLogs/>
            {/if}
        </ControlButton>
    </slot>
</Panel>

<LogContainer {isOpen} {...props}/>
