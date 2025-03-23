<script lang="ts">
    import { COLLECTION, MAP, OBJECT, objectDetails } from "$lib/model/node_field_details";
    import CollectionSettings from "./CollectionSettings.svelte";
    import MapSettings from "./MapSettings.svelte";
    import NodeSettings from "./NodeSettings.svelte";
    import SettingsField from "./SettingsField.svelte";
    import type { NodeField } from "$lib/model/nodes";

    interface Props {
        value: any
        field: NodeField,
    }
    let { value = $bindable(), field }: Props = $props();
</script>

{#if field.type === COLLECTION}
    <CollectionSettings bind:values={value} {field}/>
{:else if field.type === MAP}
    <MapSettings bind:settings={value} {field}/>
{:else if field.type === OBJECT}
    <NodeSettings
        bind:settings={value}
        fields={objectDetails(field)?.schema ?? []}
    />
{:else}
    <SettingsField bind:value metadata={field}/>
{/if}
