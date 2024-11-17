<script lang="ts">
    import IconTrash from "lucide-svelte/icons/trash-2"
    import LoadingButton from "$lib/components/LoadingButton.svelte";
    import Confirmation from "$lib/components/confirm/Confirmation.svelte";
    import type { Snippet } from "svelte";

    interface Props {
        body: Snippet
        onconfirmed: () => Promise<void>
    }
    const { body, onconfirmed }: Props = $props();

    let openState = $state(false);
</script>

<LoadingButton class="" onclick={() => openState = true}>
    {#snippet idle()}
        <IconTrash/>
    {/snippet}
</LoadingButton>

{#if openState}
    <Confirmation
            {body}
            bind:open={openState}
            {onconfirmed}
    />
{/if}
