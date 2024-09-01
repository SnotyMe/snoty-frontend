<script lang="ts">
    import IconAdd from "lucide-svelte/icons/square-plus"
    import { ControlButton, Panel } from "@xyflow/svelte";
    import AddNodeDrawer from "$lib/components/add/AddNodeDrawer.svelte";
    import type { AddNodeProps } from "$lib/components/add";
    import LogContainer from "$lib/components/logs/LogContainer.svelte";
    import IconOpenLogs from "lucide-svelte/icons/scroll-text";
    import IconCloseLogs from "lucide-svelte/icons/scroll";

    type Props = Omit<AddNodeProps, "isOpen">
    const props: Props = $props()

    const ADD = "add";
    const LOGS = "logs";

    const openStates: Record<string, boolean> = $state({});

    function toggleOpen(state: string) {
        for (const key in openStates) {
            if (key !== state) {
                openStates[key] = false;
            }
        }
        openStates[state] = !openStates[state];
    }
</script>

<style>
    :global(.no-fill svg) {
        fill: none;
    }
</style>

<Panel position="top-left" class="svelte-flow__controls">
    <ControlButton
            on:click={() => toggleOpen(ADD)}
            class="svelte-flow__controls-addnode"
            title="add node"
            aria-label="add node"
    >
        <IconAdd/>
    </ControlButton>
</Panel>

<AddNodeDrawer {...props} bind:isOpen={openStates[ADD]}/>

<Panel position="top-right" class="svelte-flow__controls">
    <ControlButton
            on:click={() => toggleOpen(LOGS)}
            class="svelte-flow__controls-showlogs no-fill"
            title="show logs"
            aria-label="show logs"
    >
        {#if openStates[LOGS]}
            <IconOpenLogs/>
        {:else}
            <IconCloseLogs/>
        {/if}
    </ControlButton>
</Panel>

<LogContainer isOpen={openStates[LOGS]} {...props}/>
