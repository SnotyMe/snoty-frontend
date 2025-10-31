<script lang="ts">
    import type { Workflow } from "$lib/model/flows";
    import IconShare from "lucide-svelte/icons/share-2";
    import NodePopup from "$lib/components/node/popup/NodePopup.svelte";
    import ExportFlow from "$lib/components/flow/export/ExportFlow.svelte";
    import type { ApiProps } from "$lib/api/api";
    import { Dialog } from "@skeletonlabs/skeleton-svelte";

    interface Props {
        apiProps: ApiProps
        flow: Workflow;
    }

    const { apiProps, flow }: Props = $props();
</script>

<NodePopup>
    {#snippet trigger()}
        <Dialog.Trigger>
            <button class="svelte-flow__controls-button no-fill">
                <IconShare/>
            </button>
        </Dialog.Trigger>
    {/snippet}
    {#snippet content()}
        <ExportFlow {apiProps} {flow}/>
    {/snippet}
</NodePopup>
