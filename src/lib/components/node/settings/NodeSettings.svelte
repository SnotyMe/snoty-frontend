<script lang="ts">
    import type { NodeField, SchemaValues } from "$lib/model/nodes";
    import { COLLECTION, CREDENTIAL, MAP, OBJECT } from "$lib/model/node_field_details";
    import SettingsField from "./SettingsField.svelte";
    import PolySettings from "$lib/components/node/settings/PolySettings.svelte";

    interface Props {
        settings: SchemaValues

        fields: NodeField[]
    }
    let { settings = $bindable(), fields }: Props = $props();
</script>

<table class="table border-collapse">
    <tbody>
        {#each fields as field}
            {@const isList = field.type === COLLECTION}
            {@const isObject = field.type === OBJECT}
            {@const isMap = field.type === MAP}
            {@const isCredential = field.type === CREDENTIAL}
            {@const hasChildren = isList || isObject || isMap || isCredential}
            <tr>
                <th colspan={hasChildren ? 2 : 1}>
                    <p class="whitespace-nowrap w-[min-content]" title={field.description}>{field.displayName}</p>

                    {#if hasChildren}
                        <PolySettings bind:value={settings[field.name]} {field}/>
                    {/if}
                </th>

                {#if !hasChildren}
                    <th class="w-full">
                        <SettingsField bind:value={settings[field.name]} metadata={field}/>
                    </th>
                {/if}
            </tr>
        {/each}
    </tbody>
</table>
