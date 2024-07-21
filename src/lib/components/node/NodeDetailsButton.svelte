<script lang="ts">
    import IconMaximize from "lucide-svelte/icons/maximize-2";
    import NodeDetails from "$lib/components/node/NodeDetails.svelte";
    import type { SettingsStore } from "$lib/utils/settings.svelte";
    import type { FullNode } from "$lib/components/node/node";

    interface Props {
        data: FullNode;
        settings: SettingsStore
    }

    let { data, settings }: Props = $props();
    let element: HTMLDialogElement;
</script>
<NodeDetails bind:dialog={element} {data} {settings}/>
<button onclick={() => element.showModal()} class="block">
    <IconMaximize/>
</button>
