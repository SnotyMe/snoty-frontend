<script lang="ts">
    import { type ApiProps, type ErrorJson, isErrorJson, unwrapOrNull } from "$lib/api/api";
    import { getContext } from "svelte";
    import { listCredentials, updateCredential } from "$lib/api/credential_api";
    import HandleError from "$lib/components/HandleError.svelte";
    import IconTrash from "lucide-svelte/icons/trash";
    import { deleteCredential } from "$lib/api/credential_api";
    import {
        CredentialAccess,
        type CredentialDefinitionWithStatisticsDto,
        type CredentialDto, type CredentialUpdateDto
    } from "$lib/model/credential";
    import CreateCredentialButton from "$lib/components/credential/CreateCredentialButton.svelte";
    import Credential from "./Credential.svelte";

    const apiProps = getContext<ApiProps>("apiProps");

    interface Props {
        credentialDefinition: CredentialDefinitionWithStatisticsDto
        searchQuery: string
        credentials: CredentialDto[]
    }
    const { credentials, credentialDefinition, searchQuery }: Props = $props();

    async function onchange(credentialId: string, newValue: CredentialUpdateDto) {
        await updateCredential(apiProps, credentialId, newValue);
    }

    async function ondelete(credentialId: string, index: number) {
        await deleteCredential(apiProps, credentialId);
        unwrapOrNull(credentials)?.splice(index, 1)
    }

    const processedCredentials = $derived.by(() => {
        if (isErrorJson(credentials)) return [];

        const grouped: Record<CredentialAccess, CredentialDto[]> = {
            [CredentialAccess.USER]: [],
        };

        for (const credential of credentials) {
            if (searchQuery && !credential.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                continue;
            }
            const access = credential.access || "unknown";
            if (!grouped[access]) {
                grouped[access] = [];
            }
            grouped[access].push(credential);
        }
        return Object.entries(grouped).map(([access, creds]) => ({ access, creds }));
    })
</script>

<div id="col-right" class="h-full overflow-y-auto">
    <h2 class="text-center h2 pt-0 mb-4 leading-none">{credentialDefinition.displayName}</h2>
    <HandleError element={credentials}>
        {#snippet success()}
            <ul class="divide-y-2 divide-surface-800-200">
                {#each processedCredentials as { access, creds: credentials } (credentials)}
                    <li class="py-4">
                        {#if access !== CredentialAccess.USER}
                            <h4 class="h4">{access[0].toUpperCase() + access.slice(1).toLowerCase()}</h4>
                            <hr class="p-1">
                        {/if}
                        <ul class="list-disc list-inside h-full space-y-2">
                            {#each credentials as credential, index}
                                <li class="list-none flex flex-row items-center gap-2">
                                    <Credential {credential} {credentialDefinition} {onchange}/>
                                    <div class="inline-block">
                                        <button onclick={() => ondelete(credential.id, index)}>
                                            <IconTrash/>
                                        </button>
                                    </div>
                                </li>
                            {/each}
                        </ul>
                        {#if credentialDefinition != null}
                            <CreateCredentialButton definition={credentialDefinition} oncreate={() => refreshCredentials()}/>
                        {/if}
                    </li>
                {/each}
            </ul>
        {/snippet}
    </HandleError>
</div>
