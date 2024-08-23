<script lang="ts">
    import NodeSettings from "$lib/components/node/NodeSettings.svelte";
    import type { SettingsStore } from "$lib/utils/settings.svelte";
    import type { NodeMetadata } from "$lib/model/nodes";
    import { onMount } from "svelte";
    import NodeName from "$lib/components/node/NodeName.svelte";

    interface Props {
        nodeId?: string
        metadata: NodeMetadata
        settings: SettingsStore
        dialog: HTMLDialogElement
        instashow?: boolean
    }

    let {
        nodeId,
        metadata,
        settings,
        dialog = $bindable(),
        instashow = false,
    }: Props = $props()

    function close(event: MouseEvent) {
        const rect = dialog.getBoundingClientRect();
        const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
            rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
        if (!isInDialog) {
            dialog.close();
        }
    }

    function closeKeypress(event: KeyboardEvent) {
        if (event.key === "Escape") {
            dialog.close();
        }
    }

    if (instashow) {
        onMount(() => dialog.showModal());
    }
</script>

<style>
    :global(body) {
        transition: filter 0.5s;
    }

    :global(body:has(dialog[open])) {
        filter: blur(0.2em)
    }

    dialog[open] {
        animation: fade-in 0.3s ease-out;
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
            transform: scaleY(0);
        }
        100% {
            opacity: 1;
            transform: scaleY(1);
        }
    }
</style>

<dialog
        bind:this={dialog}
        onclick={close}
        onkeypress={closeKeypress}
        class="w-8/12 max-w-4xl h-8/12 shadow-lg cursor-auto flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800 overflow-hidden border"
>
    {#if metadata}
        <div class="flex items-center gap-2">
            <NodeName settings={settings} {metadata}/>
            {#if nodeId}
                <p>{nodeId}</p>
            {/if}
        </div>
        <div class="flow-node-options table-wrap border-t-4 mt-1">
            <NodeSettings settings={settings} {metadata} expanded={true}/>
        </div>
    {:else}
        <div class="text-center">Unknown node type</div>
    {/if}
    <slot/>
</dialog>
