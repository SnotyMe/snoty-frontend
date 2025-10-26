<script lang="ts">
    import { Accordion } from "@skeletonlabs/skeleton-svelte";
    import type { NodeField } from "$lib/model/nodes";
    import NodeFieldDetails from "$lib/components/node/popup/NodeFieldDetails.svelte";

    interface Props {
        name: string
        fields: NodeField[]
    }
    const { name, fields }: Props = $props();
</script>

<Accordion.Item value={name}>
    <Accordion.ItemTrigger>
        <p class="h5">{name}</p>
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
        <div class="flex flex-col gap-2">
            {#if fields.length > 0}
                {#each fields as field}
                    <div>
                        <NodeFieldDetails {field}/>
                    </div>
                {/each}
            {:else}
                <div class="chip preset-filled-surface-500">Dynamic</div>
            {/if}
        </div>
    </Accordion.ItemContent>
</Accordion.Item>
