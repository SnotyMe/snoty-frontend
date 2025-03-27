<script lang="ts">
    import { Modal } from '@skeletonlabs/skeleton-svelte';
    import type { Snippet } from "svelte"

    interface Props {
        open: boolean;
        onconfirmed: () => Promise<void>;
        body: Snippet
    }
    let {
        open = $bindable(false),
        onconfirmed,
        body,
    }: Props = $props();
</script>

<style>
    /* Hide some random <span> wrapping everything in <Modal> that destroys the flex justify-between layout */
    :global(span:has(.trigger-removeme)) {
        display: none;
    }
</style>

<Modal
        bind:open
        contentBase="card bg-surface-100-900 p-4 space-y-4 shadow-xl max-w-(--breakpoint-sm)"
        backdropClasses="backdrop-blur-xs"
>
    {#snippet trigger()}
        <span class="trigger-removeme"></span>
    {/snippet}
    {#snippet content()}
        <header class="flex justify-between">
            <h2 class="h2">Are you sure?</h2>
        </header>
        <article>
            {@render body()}
        </article>
        <small class="text-surface-700-300">This action cannot be undone.</small>
        <footer class="flex justify-end gap-4">
            <button type="button" class="btn preset-tonal" onclick={() => open = false}>Cancel</button>
            <button type="button" class="btn preset-filled" onclick={onconfirmed}>Confirm</button>
        </footer>
    {/snippet}
</Modal>
