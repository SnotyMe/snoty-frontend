<script lang="ts">
    import { COLLECTION, CREDENTIAL, MAP, OBJECT, objectDetails, credentialDetails } from "$lib/model/node_field_details";
    import type { NodeField } from "$lib/model/nodes";
    import CollectionSettings from "./CollectionSettings.svelte";
    import MapSettings from "./MapSettings.svelte";
    import NodeSettings from "./NodeSettings.svelte";
    import SettingsField from "./SettingsField.svelte";
    import CredentialSelector from "$lib/components/node/settings/CredentialSelector.svelte";

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
{:else if field.type === CREDENTIAL}
    <CredentialSelector bind:value={value} details={credentialDetails(field)} />
{:else}
    <SettingsField bind:value metadata={field}/>
{/if}
