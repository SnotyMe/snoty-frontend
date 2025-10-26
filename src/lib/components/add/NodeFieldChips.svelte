<script lang="ts">
    import type { NodeField } from "$lib/model/nodes";

    interface Props {
        name: string;
        fields: NodeField[] | null;
    }

    const { name, fields }: Props = $props();
</script>

<style>
    @reference "../../../app.css"

    .chip {
        @apply px-2;
    }
</style>

{#if fields != null}
    <span>{name}</span>
    <div class="flex items-center gap-1 overflow-x-auto py-2">
        {#if fields.length === 0}
            <div class="chip preset-filled-surface-500">Dynamic</div>
        {:else}
            {#each fields as field}
                <div class="chip preset-filled">{field.name}</div>
            {/each}
        {/if}
    </div>
{/if}
