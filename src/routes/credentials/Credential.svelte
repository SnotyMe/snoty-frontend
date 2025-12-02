<script lang="ts">
    import NodeName from "$lib/components/node/settings/NodeName.svelte";
    import NodeSettings from "$lib/components/node/settings/NodeSettings.svelte";
    import type {
        CredentialDefinition,
        CredentialDto,
        CredentialUpdateDto
    } from "$lib/model/credential";
    import { twMerge } from "tailwind-merge";

    interface Props {
        wrapperClass?: string
        credential: CredentialDto
        credentialDefinition: CredentialDefinition
        onchange?: (credentialId: string, newSettings: CredentialUpdateDto) => void
    }

    const {
        wrapperClass,
        credential,
        credentialDefinition,
        onchange,
    }: Props = $props();

    const isAccessible = $derived(credential.data != null)

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

<div class={twMerge("flex flex-col cursor-auto flow-node p-2 pb-1 card preset-filled-surface-100-900 border-surface-200-800 border", wrapperClass)}>
    <div class="flex justify-between">
        {#if isAccessible}
            <NodeName settings={credential}/>
        {:else}
            <h5 class="input-field">{credential.name}</h5>
        {/if}
        <slot/>
    </div>
    <div class="flow-node-options grow table-wrap border-t-4 border-surface-200-800 mt-1 pr-0.5 overflow-y-auto">
        {#if credentialDefinition == null}
            <p class="text-error-400">Credential definition not found.</p>
        {:else if isAccessible}
            <NodeSettings settings={credential.data} fields={credentialDefinition.schema}/>
        {/if}
    </div>
</div>
