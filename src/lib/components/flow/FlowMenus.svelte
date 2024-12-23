<script lang="ts">
    import IconAdd from "lucide-svelte/icons/square-plus"
    import { ControlButton, Panel } from "@xyflow/svelte";
    import AddNodeDrawer from "$lib/components/add/AddNodeDrawer.svelte";
    import type { AddNodeProps } from "$lib/components/add";
    import LogContainer from "$lib/components/logs/LogContainer.svelte";
    import IconOpenLogs from "lucide-svelte/icons/scroll-text";
    import IconCloseLogs from "lucide-svelte/icons/scroll";
    import IconRocket from "lucide-svelte/icons/rocket";
    import SettingsField from "$lib/components/node/settings/SettingsField.svelte";
    import { renameFlow, triggerFlow } from "$lib/api/flow_api";
    import ExportFlow from "$lib/components/flow/export/ExportFlow.svelte";

    type Props = Omit<AddNodeProps, "isOpen">;
    const props: Props = $props();

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

    let flowName = $state(props.flow.name);
    let lastFlowName = $state.snapshot(flowName);
    $effect(() => {
        if (lastFlowName !== flowName) {
            renameFlow(props.apiProps, props.flow._id, flowName);
            lastFlowName = flowName;
        }
    })
</script>

<style>
    :global(.no-fill svg) {
        fill: none;
    }
</style>

<Panel position="top-left" class="flex flex-row items-center">
    <div class="svelte-flow__controls">
        <ControlButton
                on:click={() => toggleOpen(ADD)}
                class="svelte-flow__controls-addnode"
                title="add node"
                aria-label="add node"
        >
            <IconAdd/>
        </ControlButton>
    </div>
    <SettingsField
            bind:value={flowName}
            class="ml-2 border-none flex justify-center items-center"
    />
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
    <ControlButton
            on:click={() => triggerFlow(props.apiProps, props.flow._id)}
            class="svelte-flow__controls-trigger no-fill"
            title="trigger run"
            aria-label="trigger run"
    >
        <IconRocket/>
    </ControlButton>
    <ExportFlow flow={props.flow}/>
</Panel>

<LogContainer flowId={props.flow._id} isOpen={openStates[LOGS]} {...props}/>
