<script lang="ts">
    import type { ExportedFlow, ImportFlowDTO, ImportNodeDTO } from "$lib/model/flow_import_export";
    import { createSettings, type SettingsStore } from "$lib/utils/settings.svelte";
    import NodeSettings from "$lib/components/node/NodeSettings.svelte";
    import { getNodeTemplates, type NodeMetadataMap, type NodeTemplatesMap } from "$lib/model/nodes";
    import { getNodeMetadata } from "$lib/model/nodes";
    import SettingsField from "$lib/components/node/SettingsField.svelte";
    import { replaceAllCensoredWithDefault } from "$lib/components/flow/import/utils";
    import { config } from "$lib/components/template/config";
    import Liquid from "$lib/components/template/Liquid.svelte";
    import { setNodeAPI } from "$lib/components/template/node";
    import { browser } from "$app/environment";

    interface Props {
        metadatas: NodeMetadataMap
        templates: NodeTemplatesMap
        template: ExportedFlow
        flow: ImportFlowDTO & { nodes: (ImportNodeDTO & { settingsStore: SettingsStore })[] }
        showIntermediate?: boolean
    }
    let { metadatas, templates, template, flow = $bindable(), showIntermediate }: Props = $props();
    flow = {
        name: template.templateName,
        nodes: template.nodes.map(node => ({
            ...node,
            settingsStore: createSettings(replaceAllCensoredWithDefault(node.settings)),
        })),
    };
</script>

<div class="flex flex-col px-2 space-y-4">
    <div class="flex flex-col space-y-2">
        <label for="name">Flow Name</label>
        <input type="text" id="name" bind:value={flow.name} class="input"/>
    </div>

    {#each flow.nodes.filter(node => showIntermediate || getNodeMetadata(metadatas, node.descriptor)?.position !== "MIDDLE") as node}
        {@const nodeTemplates = getNodeTemplates(templates, node.descriptor)}
        {@const metadata = getNodeMetadata(metadatas, node.descriptor)}
        {browser ? setNodeAPI(node.id, { node, metadata, settings: node.settingsStore }) : undefined}
        <div class="flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800 block overflow-auto border">
            <SettingsField
                value={node.settingsStore.settings["name"]}
                onchange={(_, newName) => node.settingsStore.setProperty(["name"], newName)}
            />
            <NodeSettings settings={node.settingsStore} {metadata}/>
            {#if nodeTemplates?.has("node_bottom")}
                <details>
                    <summary class="cursor-pointer">Details</summary>
                    <Liquid
                        template={nodeTemplates.get("node_bottom")}
                        inputs={{node: {...node, _id: node.id}, config, metadata, settings: node.settingsStore.settings}}
                    />
                </details>
            {/if}
        </div>
    {/each}
</div>
