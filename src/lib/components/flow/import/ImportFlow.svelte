<script lang="ts">
    import { FileUpload } from "@skeletonlabs/skeleton-svelte";
    import IconDropzone from "lucide-svelte/icons/cloud-upload";
    import IconFile from "lucide-svelte/icons/cloud-upload";
    import IconRemove from "lucide-svelte/icons/circle-x";
    import type { ExportedFlow, ImportFlowDTO } from "$lib/model/flow_import_export";
    import type { FileChangeDetails } from "@zag-js/file-upload"
    import ImportFlowSettings from "$lib/components/flow/import/ImportFlowSettings.svelte";
    import type { NodeMetadataMap, NodeTemplatesMap } from "$lib/model/nodes";

    interface Props {
        metadatas: NodeMetadataMap
        templates: NodeTemplatesMap
        flow: ImportFlowDTO | null
        showIntermediate?: boolean
    }
    let { metadatas, templates, flow = $bindable(), showIntermediate }: Props = $props();
    let template: ExportedFlow | null = $state(null);

    let file: File | null = null;

    async function fileChanged(change: FileChangeDetails) {
        if (change.acceptedFiles.length === 0) {
            file = null;
            flow = null;
            template = null;
            return;
        }
        file = change.acceptedFiles[0];
        const text = await file.text();
        template = JSON.parse(text);
    }
</script>

<div class="space-y-4 overflow-y-auto">
    <FileUpload
            name="exported_flow"
            accept="application/json"
            maxFiles={1}
            subtext=""
            onFileChange={fileChanged}
            classes="w-full p-2"
    >
        {#snippet iconInterface()}<IconDropzone class="size-8" />{/snippet}
        {#snippet iconFile()}<IconFile class="size-4" />{/snippet}
        {#snippet iconFileRemove()}<IconRemove class="size-4" />{/snippet}
    </FileUpload>

    {#if template}
        {#key template}
            <ImportFlowSettings {template} {metadatas} {templates} {showIntermediate} bind:flow/>
        {/key}
    {/if}
</div>
