<script lang="ts">
    import IconAdd from "lucide-svelte/icons/square-plus";
    import { ControlButton, Panel } from "@xyflow/svelte";
    import AddNodeDrawer from "$lib/components/add/AddNodeDrawer.svelte";
    import type { FlowMenusProps } from "$lib/components/add";
    import LogContainer from "$lib/components/logs/LogContainer.svelte";
    import IconOpenLogs from "lucide-svelte/icons/scroll-text";
    import IconCloseLogs from "lucide-svelte/icons/scroll";
    import SettingsField from "$lib/components/node/settings/SettingsField.svelte";
    import { renameFlow } from "$lib/api/flow_api";
    import ExportFlowButton from "$lib/components/flow/export/ExportFlowButton.svelte";
    import FlowTriggerButton from "$lib/components/flow/FlowTriggerButton.svelte";
    import FlowSettingsButton from "$lib/components/flow/settings/FlowSettingsButton.svelte";

    type Props = Omit<FlowMenusProps, "isOpen">;
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

    /* :global is required because svelte moment */
    :global(.svelte-flow__controls-addnode) {
        border-bottom: none;
        border-right: 1px solid var( --xy-controls-button-border-color-props, var(--xy-controls-button-border-color, var(--xy-controls-button-border-color-default)));
    }
</style>

<Panel position="top-left" class="flex flex-row items-center">
    <div class="svelte-flow__controls flex-row!">
        <ControlButton
                onclick={() => toggleOpen(ADD)}
                class="svelte-flow__controls-addnode"
                title="add node"
                aria-label="add node"
        >
            <IconAdd/>
        </ControlButton>
        <FlowSettingsButton apiProps={props.apiProps} flow={props.flow}/>
    </div>
    <SettingsField
            bind:value={flowName}
            class="ml-2 border-none flex justify-center items-center"
    />
</Panel>

<AddNodeDrawer {...props} bind:isOpen={openStates[ADD]}/>

<Panel position="top-right" class="flex flex-row">
    <FlowTriggerButton apiProps={props.apiProps} flow={props.flow}/>
    <div>
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
        <ExportFlowButton apiProps={props.apiProps} flow={props.flow}/>
    </div>
</Panel>

<LogContainer flowId={props.flow._id} isOpen={openStates[LOGS]} {...props}/>
