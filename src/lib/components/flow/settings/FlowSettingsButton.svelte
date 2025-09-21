<script lang="ts">
    import FlowSettings from "$lib/components/flow/settings/FlowSettingsPopup.svelte";
    import IconSettings from "lucide-svelte/icons/settings";
    import { ControlButton } from "@xyflow/svelte";
    import type { Workflow } from "$lib/model/flows";
    import type { ApiProps } from "$lib/api/api";
    import NodePopup from "$lib/components/node/popup/NodePopup.svelte";

    let dialog: HTMLDialogElement;

    interface Props {
        apiProps: ApiProps
        flow: Workflow
    }
    const {
        apiProps,
        flow,
    }: Props = $props();
</script>

<NodePopup bind:dialog class="w-lg">
    <FlowSettings {apiProps} {flow} onclose={() => dialog?.close()}/>
</NodePopup>

<ControlButton
        onclick={() => dialog?.showModal()}
        class="svelte-flow__controls-settings no-fill border-none!"
        title="settings"
        aria-label="settings"
>
    <IconSettings/>
</ControlButton>
