<script lang="ts">
    import IconTrash from "lucide-svelte/icons/trash-2"
    import { Dialog, Portal } from "@skeletonlabs/skeleton-svelte";
    import type { Snippet } from "svelte";

    interface Props {
        body: Snippet
        onconfirmed: () => Promise<void>
    }
    const { body, onconfirmed }: Props = $props();
</script>

<Dialog>
    <Dialog.Trigger>
        <IconTrash/>
    </Dialog.Trigger>
    <Portal>
        <Dialog.Backdrop class="fixed inset-0 z-50 data-[state=open]:backdrop-blur-xs" />
        <Dialog.Positioner class="fixed inset-0 z-50 flex justify-center items-center">
            <Dialog.Content class="card bg-surface-100-900 w-md p-4 space-y-2 shadow-xl">
                <Dialog.Title class="h1 text-center">Are you sure?</Dialog.Title>
                <Dialog.Description>{@render body()}</Dialog.Description>
                <small class="text-surface-700-300">This action cannot be undone.</small>
                <footer class="flex justify-end gap-4">
                    <Dialog.CloseTrigger>Cancel</Dialog.CloseTrigger>
                    <button type="button" class="btn preset-filled" onclick={onconfirmed}>Confirm</button>
                </footer>
            </Dialog.Content>
        </Dialog.Positioner>
    </Portal>
</Dialog>
