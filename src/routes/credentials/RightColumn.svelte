<script lang="ts">
    import { type ApiProps } from "$lib/api/api";
    import { getContext } from "svelte";
    import { listCredentials } from "$lib/api/credential_api";
    import HandleError from "$lib/components/HandleError.svelte";
    import {
        CredentialAccess,
        type CredentialDefinitionWithStatisticsDto,
        type CredentialDto
    } from "$lib/model/credential";
    import NodeSettings from "$lib/components/node/settings/NodeSettings.svelte";
    import NodeName from "$lib/components/node/settings/NodeName.svelte";
    import CreateCredentialButton from "$lib/components/credential/CreateCredentialButton.svelte";

    const apiProps = getContext<ApiProps>("apiProps");

    interface Props {
        selectedCredentialType: string | null
        credentialDefinition: CredentialDefinitionWithStatisticsDto | null
    }
    const { selectedCredentialType, credentialDefinition }: Props = $props();

    function groupByAccess(credentials: CredentialDto[]) {
        const grouped: Record<CredentialAccess, CredentialDto[]> = {
            [CredentialAccess.USER]: [],
        };
        for (const credential of credentials) {
            const access = credential.access || "unknown";
            if (!grouped[access]) {
                grouped[access] = [];
            }
            grouped[access].push(credential);
        }
        return Object.entries(grouped).map(([access, creds]) => ({ access, creds }));
    }

    let version = $state(0)
    const fetchCredentials = $derived(async () => {
        version
        if (selectedCredentialType) return listCredentials(apiProps, selectedCredentialType)
        else return Promise.resolve([] as CredentialDto[])
    })
</script>

<div id="col-right" class="h-full overflow-y-auto p-4">
    {#if selectedCredentialType != null}
        {#await fetchCredentials() then credentials}
            <h2 class="text-center h2 mb-4">{credentialDefinition?.displayName ?? selectedCredentialType}</h2>
            <HandleError element={credentials}>
                {#snippet success(successCredentials)}
                    <ul class="divide-y-2 divide-surface-800-200">
                        {#each groupByAccess(successCredentials) as { access, creds: credentials }}
                            <li class="py-4">
                                <h4 class="h4">{access[0].toUpperCase() + access.slice(1).toLowerCase()}</h4>
                                <hr class="p-1">
                                <ul class="list-disc list-inside h-full space-y-2">
                                    {#each credentials as credential}
                                        <li class="list-none flex flex-col cursor-auto flow-node p-2 card preset-filled-surface-100-900 border-surface-200-800 border">
                                            <div class="flex items-center">
                                                <NodeName settings={credential}/>
                                            </div>
                                            <div class="flow-node-options grow table-wrap border-y-4 border-surface-200-800 my-1 pr-0.5 overflow-y-auto">
                                                {#if credentialDefinition == null}
                                                    <p class="text-error-400">Credential definition not found.</p>
                                                {:else}
                                                    <NodeSettings settings={credential.data} fields={credentialDefinition.schema}/>
                                                {/if}
                                            </div>
                                        </li>
                                    {/each}
                                </ul>
                                {#if credentialDefinition != null}
                                    <CreateCredentialButton bind:version definition={credentialDefinition}/>
                                {/if}
                            </li>
                        {/each}
                    </ul>
                {/snippet}
            </HandleError>
        {/await}
    {:else}
        <p class="text-center text-surface-500">Select a credential type to view details.</p>
    {/if}
</div>
