<script lang="ts">
    import { Accordion } from "@skeletonlabs/skeleton-svelte";
    import { type NodeMetadata, descriptorAsString } from "$lib/model/nodes";
    import NodeHelpFields from "$lib/components/node/help/NodeHelpFields.svelte";

    interface Props {
        metadata: NodeMetadata
    }
    const { metadata }: Props = $props();

    let value: string[] = $state([]);
</script>

<div class="mt-0 m-1">
    <div class="flex justify-between mb-4">
        <h1 class="leading-none h1" style="vertical-align: top">{metadata.displayName}</h1>
        <p>{descriptorAsString(metadata.descriptor)}</p>
    </div>
    <Accordion {value} onValueChange={e => (value = e.value)} multiple>
        <NodeHelpFields name="Settings" fields={metadata.settings}/>
        {#if metadata.input}
            <hr class="hr">
            <NodeHelpFields name="Input" fields={metadata.input}/>
        {/if}
        {#if metadata.output}
            <hr class="hr">
            <NodeHelpFields name="Output" fields={metadata.output}/>
        {/if}
    </Accordion>
</div>
