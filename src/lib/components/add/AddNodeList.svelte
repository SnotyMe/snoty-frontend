<script lang="ts">
    import type { NodeDescriptor, NodeMetadataMap } from "$lib/model/nodes";
    import { Accordion } from "@skeletonlabs/skeleton-svelte";
    import NodeFieldChips from "$lib/components/add/NodeFieldChips.svelte";

    interface Props {
        metadatas: NodeMetadataMap
        onnodeadd: (nodeDescriptor: NodeDescriptor) => void
    }
    const { metadatas, onnodeadd }: Props = $props();
    let filteredMetadatas = $state(metadatas)

    const currentValue: string[] = $state([])

    function updateFilter(event: Event) {
        const value = (event.target as HTMLInputElement).value.toLowerCase()
        filteredMetadatas = new Map(Array.from(metadatas.entries())
            .filter(([_, metadata]) => metadata.displayName.toLowerCase().includes(value)))
    }
</script>

<label class="label m-1 mb-3 right w-52">
    <input class="input" type="text" placeholder="Search" oninput={updateFilter}/>
</label>

<Accordion value={currentValue}>
    {#each filteredMetadatas.values() as metadata}
        <Accordion.Item id={metadata.displayName}>
            {#snippet control()}
                <p class="h5">{metadata.displayName}</p>
            {/snippet}
            {#snippet panel()}
                <div class="flex w-full justify-between">
                    <div class="flex flex-col gap-4">
                        <NodeFieldChips name="Settings" fields={metadata.settings}/>
                        <NodeFieldChips name="Inputs" fields={metadata.input}/>
                        <NodeFieldChips name="Outputs" fields={metadata.output}/>
                    </div>
                    <button type="button" class="btn preset-filled" onclick={() => onnodeadd(metadata.descriptor)}>Add</button>
                </div>
            {/snippet}
        </Accordion.Item>
    {/each}
</Accordion>
