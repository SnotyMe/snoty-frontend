<script lang="ts">
    import FlowSettings from "$lib/components/flow/settings/FlowSettingsPopup.svelte";
    import IconSettings from "lucide-svelte/icons/settings";
    import { ControlButton } from "@xyflow/svelte";
    import type { Workflow } from "$lib/model/flows";
    import type { ApiProps } from "$lib/api/api";
    import NodePopup from "$lib/components/node/popup/NodePopup.svelte";
    import { Dialog } from "@skeletonlabs/skeleton-svelte";

    interface Props {
        apiProps: ApiProps
        flow: Workflow
    }
    const {
        apiProps,
        flow,
    }: Props = $props();
</script>

<NodePopup class="w-xl">
    {#snippet trigger()}
        <Dialog.Trigger>
            <ControlButton
                    class="svelte-flow__controls-settings no-fill border-none!"
                    title="settings"
                    aria-label="settings"
            >
                <IconSettings/>
            </ControlButton>
        </Dialog.Trigger>
    {/snippet}
    {#snippet content()}
        <FlowSettings {apiProps} {flow}/>
    {/snippet}
</NodePopup>
