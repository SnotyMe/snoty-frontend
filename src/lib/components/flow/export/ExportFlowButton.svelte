<script lang="ts">
    import type { Workflow } from "$lib/model/flows";
    import IconShare from "lucide-svelte/icons/share-2";
    import NodePopup from "$lib/components/node/popup/NodePopup.svelte";
    import ExportFlow from "$lib/components/flow/export/ExportFlow.svelte";
    import type { ApiProps } from "$lib/api/api";

    interface Props {
        apiProps: ApiProps
        flow: Workflow;
    }

    const { apiProps, flow }: Props = $props();
    let dialog: HTMLDialogElement;
</script>

<NodePopup bind:dialog>
    <ExportFlow {apiProps} {flow}/>
</NodePopup>

<button class="svelte-flow__controls-button no-fill" onclick={() => dialog?.showModal()}>
    <IconShare/>
</button>