<script lang="ts">
    import { COLLECTION, MAP, OBJECT, objectDetails } from "$lib/model/node_field_details";
    import CollectionSettings from "$lib/components/node/settings/CollectionSettings.svelte";
    import NodeSettings from "$lib/components/node/NodeSettings.svelte";
    import MapSettings from "$lib/components/node/settings/MapSettings.svelte";
    import SettingsField from "$lib/components/node/SettingsField.svelte";
    import type { NodeField } from "$lib/model/nodes";

    interface Props {
        value: any
        field: NodeField,
    }
    let { value = $bindable(), field }: Props = $props();
    const details = field.details;
</script>

{#if details.type === COLLECTION}
    <CollectionSettings bind:values={value} field={details}/>
{:else if details.type === MAP}
    <MapSettings bind:settings={value} field={details}/>
{:else if details.type === OBJECT}
    <NodeSettings
        bind:settings={value}
        fields={objectDetails(field)?.schema ?? []}
    />
{:else}
    <SettingsField bind:value metadata={field}/>
{/if}
