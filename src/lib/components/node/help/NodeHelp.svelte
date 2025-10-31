<script lang="ts">
    import { Accordion } from "@skeletonlabs/skeleton-svelte";
    import { type NodeMetadata } from "$lib/model/nodes";
    import NodeHelpFields from "$lib/components/node/help/NodeHelpFields.svelte";
    import { removeBoilerplate } from "$lib/utils/settings_utils";
    import { Dialog } from "@skeletonlabs/skeleton-svelte";

    interface Props {
        metadata: NodeMetadata
    }
    const { metadata }: Props = $props();

    let value: string[] = $state([]);
</script>

<div class="mt-0 m-1">
    <Dialog.Title class="h1 text-center">{metadata.displayName}</Dialog.Title>
    <Accordion {value} onValueChange={e => (value = e.value)} multiple>
        <NodeHelpFields name="Settings" fields={removeBoilerplate(metadata.settings)}/>
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
