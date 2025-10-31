<script lang="ts">
    import { type NodeMetadata, type NodeMetadataMap } from "$lib/model/nodes";
    import { Accordion } from "@skeletonlabs/skeleton-svelte";
    import NodeFieldChips from "$lib/components/add/NodeFieldChips.svelte";
    import IconCircleHelp from "lucide-svelte/icons/circle-help";
    import IconMinus from "lucide-svelte/icons/minus";
    import IconPlus from "lucide-svelte/icons/plus";
    import { nodeSettingsFromMetadata, removeBoilerplate } from "$lib/utils/settings_utils";
    import type { Workflow } from "$lib/model/flows";
    import AddNodeButton from "$lib/components/add/AddNodeButton.svelte";
    import type { NodeCreatedHandler } from "$lib/components/add/index";

    interface Props {
        flow: Workflow
        metadatas: NodeMetadataMap
        onshowhelp: (metadata: NodeMetadata) => void
        onnodecreated: NodeCreatedHandler
    }
    const { flow, metadatas, onshowhelp, onnodecreated }: Props = $props();
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
                    <div class="flex flex-col gap-1">
                        <button class="btn-icon-clear" onclick={() => onshowhelp(metadata)}>
                            <IconCircleHelp/>
                        </button>

                        <AddNodeButton
                            flowId={flow._id}
                            {onnodecreated}
                            descriptor={metadata.descriptor}
                            settings={nodeSettingsFromMetadata(metadata)}
                        />
                    </div>
                </div>
            </Accordion.ItemContent>
        </Accordion.Item>
    {/each}
</Accordion>
