<script lang="ts">
    import { FileUpload, type FileUploadRootProps } from "@skeletonlabs/skeleton-svelte";
    import IconFile from "lucide-svelte/icons/cloud-upload";
    import type { ExportedFlow, ImportFlowDTO } from "$lib/model/flow_import_export";
    import ImportFlowSettings from "$lib/components/flow/import/ImportFlowSettings.svelte";
    import type { NodeMetadataMap, NodeTemplatesMap } from "$lib/model/nodes";

    interface Props {
        metadatas: NodeMetadataMap
        templates: NodeTemplatesMap
        flow: ImportFlowDTO | null
        showIntermediate?: boolean
    }

    let {metadatas, templates, flow = $bindable(), showIntermediate}: Props = $props();
    let template: ExportedFlow | null = $state(null);

    let file: File | null = null;

    const fileChanged: FileUploadRootProps['onFileChange'] = async (change) => {
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
    <FileUpload onFileChange={fileChanged} accept="application/json">
        <FileUpload.Dropzone>
            <IconFile class="size-10 pointer-events-none"/>
            <span class="pointer-events-none">Select file or drag here</span>
            <FileUpload.HiddenInput/>
        </FileUpload.Dropzone>
        <FileUpload.ItemGroup>
            <FileUpload.Context>
                {#snippet children(fileUpload)}
                    {#each fileUpload().acceptedFiles as file (file.name)}
                        <FileUpload.Item {file}>
                            <FileUpload.ItemName>{file.name}</FileUpload.ItemName>
                            <FileUpload.ItemSizeText>{file.size} bytes</FileUpload.ItemSizeText>
                            <FileUpload.ItemDeleteTrigger/>
                        </FileUpload.Item>
                    {/each}
                {/snippet}
            </FileUpload.Context>
        </FileUpload.ItemGroup>
    </FileUpload>

    {#if template}
        {#key template}
            <ImportFlowSettings {template} {metadatas} {templates} {showIntermediate} bind:flow/>
        {/key}
    {/if}
</div>
