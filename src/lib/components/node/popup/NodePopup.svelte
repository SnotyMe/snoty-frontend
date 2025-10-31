<script lang="ts">
    import type { NodePopupProps } from "$lib/components/node/popup/index";
    import { Dialog, Portal } from "@skeletonlabs/skeleton-svelte";
    import { twMerge } from "tailwind-merge";

    let {
        trigger,
        content,
        actions,
        class: clazz,
        defaultOpen = false,
    }: NodePopupProps = $props();
</script>

<Dialog {defaultOpen}>
    {@render trigger?.()}
    <Portal>
        <Dialog.Backdrop class="fixed inset-0 z-30 data-[state=open]:backdrop-blur-xs"/>
        <Dialog.Positioner class="fixed inset-0 z-30 flex justify-center items-center p-4">
            <Dialog.Content class={twMerge("w-8/12 max-w-4xl m-auto shadow-lg cursor-auto flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800 overflow-x-hidden border", clazz)}>
                {@render content?.()}
                {#if actions}
                    <footer class="flex justify-end gap-1 mt-2">
                        {@render actions()}
                    </footer>
                {/if}
            </Dialog.Content>
        </Dialog.Positioner>
    </Portal>
</Dialog>
