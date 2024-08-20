<script lang="ts">
    import type { NodeField } from "$lib/model/nodes";

    interface Props {
        name: string;
        fields: NodeField[] | null;
    }

    const { name, fields }: Props = $props();
</script>

<style>
    .chip {
        @apply px-2;
    }
</style>

{#if fields != null}
    <div class="flex items-center gap-2">
        <span>{name}</span>
        {#if fields.length === 0}
            <div class="chip preset-filled-surface-500">Dynamic</div>
        {:else}
            {#each fields.slice(0, 5) as field}
                <div class="chip preset-filled">{field.name}</div>
            {/each}
            {#if fields.length > 5}
                <div class="chip preset-filled">...</div>
            {/if}
        {/if}
    </div>
{/if}
