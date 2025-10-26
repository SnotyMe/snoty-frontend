<script lang="ts">
    import type { NodeDescriptor, NodeMetadata, NodeMetadataMap } from "$lib/model/nodes";
    import { Accordion } from "@skeletonlabs/skeleton-svelte";
    import NodeFieldChips from "$lib/components/add/NodeFieldChips.svelte";
    import IconCircleHelp from "lucide-svelte/icons/circle-help";
    import IconMinus from "lucide-svelte/icons/minus";
    import IconPlus from "lucide-svelte/icons/plus";
    import { removeBoilerplate } from "$lib/utils/settings_utils";

    interface Props {
        metadatas: NodeMetadataMap
        onshowhelp: (metadata: NodeMetadata) => void
        onnodeadd: (nodeDescriptor: NodeDescriptor) => void
    }
    const { metadatas, onshowhelp, onnodeadd }: Props = $props();
    let filteredMetadatas = $state(metadatas);

    function updateFilter(event: Event) {
        const value = (event.target as HTMLInputElement).value.toLowerCase();
        filteredMetadatas = new Map(Array.from(metadatas.entries())
            .filter(([_, metadata]) => metadata.displayName.toLowerCase().includes(value)));
    }
</script>

<label class="label m-1 mb-3 right w-52">
    <input class="input" type="text" placeholder="Search" oninput={updateFilter}/>
</label>

<Accordion collapsible class="text-sm">
    {#each filteredMetadatas.values() as metadata}
        <Accordion.Item value={metadata.displayName}>
            <Accordion.ItemTrigger class="flex justify-between items-center">
                <p class="h5 leading-none">{metadata.displayName}</p>
                <Accordion.ItemIndicator class="group">
                    <IconMinus class="size-4 group-data-[state=open]:block hidden" />
                    <IconPlus class="size-4 group-data-[state=open]:hidden block" />
                </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>
            <Accordion.ItemContent class="pt-0">
                <div class="grid grid-cols-[1fr_auto] gap-4 w-full">
                    <div class="grid grid-cols-[auto_1fr] gap-x-4 grow inset-shadow-lg inset-shadow-surface-50-950 items-center relative">
                        <NodeFieldChips name="Settings" fields={removeBoilerplate(metadata.settings)}/>
                        <NodeFieldChips name="Inputs" fields={metadata.input}/>
                        <NodeFieldChips name="Output" fields={metadata.output}/>
                        <div class="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-r from-transparent to-surface-100-900"></div>
                    </div>
                    <div class="flex justify-right items-center gap-2">
                        <button type="button" onclick={() => onshowhelp(metadata)}>
                            <IconCircleHelp/>
                        </button>
                        <button type="button" class="btn preset-filled" onclick={() => onnodeadd(metadata.descriptor)}>
                            Add
                        </button>
                    </div>
                </div>
            </Accordion.ItemContent>
        </Accordion.Item>
    {/each}
</Accordion>
