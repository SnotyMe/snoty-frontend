<script lang="ts">
    import type { NodeMetadata } from "$lib/model/nodes";
    import IconCircleHelp from "lucide-svelte/icons/circle-help";
    import NodeHelpPopup from "./NodeHelpPopup.svelte";

    interface Props {
        metadata: NodeMetadata
    }
    const { metadata }: Props = $props();
    let element: HTMLDialogElement;
</script>

<NodeHelpPopup bind:dialog={element} {metadata}/>
<button onclick={() => element.showModal()} class="block">
    <IconCircleHelp/>
</button>
