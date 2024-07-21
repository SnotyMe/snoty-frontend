<script lang="ts">
    import NodeSettings from "$lib/components/node/NodeSettings.svelte";
    import SettingsField from "$lib/components/node/SettingsField.svelte";
    import type { SettingsStore } from "$lib/utils/settings.svelte";
    import type { FullNode } from "$lib/components/node/node";

    interface Props {
        data: FullNode
        settings: SettingsStore
        dialog: HTMLDialogElement
    }

    let {
        data,
        settings,
        dialog = $bindable()
    }: Props = $props()
    const metadata = data.metadata

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
        class="w-8/12 max-w-4xl h-8/12 cursor-auto flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800 overflow-hidden border"
>
    {#if metadata}
        <SettingsField
                key="name"
                onchange={settings.setProperty}
                value={settings.settings["name"] ?? metadata.displayName}/>
        <div class="flow-node-options table-wrap border-t-4 mt-1">
            <NodeSettings settings={settings} {metadata} expanded={true}/>
        </div>
    {:else}
        <div class="text-center">Unknown node type</div>
    {/if}
</dialog>
