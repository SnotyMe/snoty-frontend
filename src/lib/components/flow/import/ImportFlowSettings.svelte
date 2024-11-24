<script lang="ts">
    import type { ExportedFlow, ImportFlowDTO, ImportNodeDTO } from "$lib/model/flow_import_export";
    import { createSettings, type SettingsStore } from "$lib/utils/settings.svelte";
    import NodeSettings from "$lib/components/node/NodeSettings.svelte";
    import type { NodeMetadataMap } from "$lib/model/nodes";
    import { getNodeMetadata } from "$lib/model/nodes";
    import SettingsField from "$lib/components/node/SettingsField.svelte";
    import { replaceAllCensoredWithDefault } from "$lib/components/flow/import/utils";

    interface Props {
        metadatas: NodeMetadataMap
        template: ExportedFlow
        flow: ImportFlowDTO & { nodes: (ImportNodeDTO & { settingsStore: SettingsStore })[] }
    }
    let { metadatas, template, flow = $bindable() }: Props = $props();
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

    {#each flow.nodes as node}
        <div class="flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 divide-surface-200-800 block overflow-auto border">
            <SettingsField value={node.settingsStore.settings["name"]} onchange={name => node.settingsStore.setProperty(["name"], name)}/>
            <NodeSettings settings={node.settingsStore} metadata={getNodeMetadata(metadatas, node.descriptor)}/>
        </div>
    {/each}
</div>
