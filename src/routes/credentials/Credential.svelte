<script lang="ts">
    import NodeName from "$lib/components/node/settings/NodeName.svelte";
    import NodeSettings from "$lib/components/node/settings/NodeSettings.svelte";
    import type {
        CredentialDefinitionWithStatisticsDto,
        CredentialDto,
        CredentialUpdateDto
    } from "$lib/model/credential";

    interface Props {
        credential: CredentialDto
        credentialDefinition: CredentialDefinitionWithStatisticsDto
        onchange?: (credentialId: string, newSettings: CredentialUpdateDto) => void
    }

    const {
        credential,
        credentialDefinition,
        onchange,
    }: Props = $props();

    let previousSettings = $state.snapshot(credential);
    $effect(() => {
        const newSettings = $state.snapshot(credential);
        if (JSON.stringify(previousSettings) != JSON.stringify(newSettings)) {
            const updateDto: CredentialUpdateDto = {
                name: newSettings.name,
                data: newSettings.data,
            };
            onchange?.(credential.id, updateDto);
            previousSettings = newSettings;
        }
    })
</script>

<div class="grow flex flex-col cursor-auto flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 border">
    <div class="flex items-center">
        <NodeName settings={credential}/>
    </div>
    <div class="flow-node-options grow table-wrap border-y-4 border-surface-200-800 my-1 pr-0.5 overflow-y-auto">
        {#if credentialDefinition == null}
            <p class="text-error-400">Credential definition not found.</p>
        {:else if credential.data != null}
            <NodeSettings settings={credential.data} fields={credentialDefinition.schema}/>
        {/if}
    </div>
</div>
