<script lang="ts">
    import type { NodeField, NodeSettings } from "$lib/model/nodes";
    import { COLLECTION, OBJECT, MAP, objectDetails } from "$lib/model/node_field_details";
    import CollectionSettings from "$lib/components/node/settings/CollectionSettings.svelte";
    import NodeSettingsComponent from "./NodeSettings.svelte";
    import MapSettings from "$lib/components/node/settings/MapSettings.svelte";
    import SettingsField from "$lib/components/node/SettingsField.svelte";

    interface Props {
        settings: NodeSettings
        expanded?: boolean

        fields: NodeField[]
    }
    let { settings = $bindable(), expanded = false, fields }: Props = $props();
</script>

<table class="table border-collapse">
    <tbody>
        {#each fields as field}
            {@const isList = field.type === COLLECTION}
            {@const isObject = field.type === OBJECT}
            {@const isMap = field.type === MAP}
            {@const hasChildren = isList || isObject || isMap}
            <tr>
                <th colspan={hasChildren ? 2 : 1}>
                    <p title={field.description}>{field.displayName}</p>

                    {#if isObject}
                        <NodeSettingsComponent
                                {expanded}
                                {settings}
                                fields={objectDetails(field.details)?.schema}
                        />
                    {:else if isList}
                        <CollectionSettings bind:values={settings[field.name]} {field}/>
                    {:else if isMap}
                        <MapSettings bind:settings={settings[field.name]} {field}/>
                    {/if}
                </th>

                {#if !hasChildren}
                    <th>
                        <SettingsField bind:value={settings[field.name]} metadata={field}/>
                    </th>
                {/if}
            </tr>
        {/each}
    </tbody>
</table>
