<script lang="ts">
    import { type ApiProps, isErrorJson, unwrapOrNull } from "$lib/api/api";
    import { getContext } from "svelte";
    import { deleteCredential, updateCredential } from "$lib/api/credential_api";
    import {
        CredentialScope,
        type CredentialDefinitionWithStatisticsDto,
        type CredentialDto,
        type CredentialUpdateDto
    } from "$lib/model/credential";
    import CreateCredentialButton from "$lib/components/credential/CreateCredentialButton.svelte";
    import Credential from "./Credential.svelte";
    import DeleteButton from "$lib/components/delete/DeleteButton.svelte";

    const apiProps = getContext<ApiProps>("apiProps");

    interface Props {
        credentialDefinition: CredentialDefinitionWithStatisticsDto
        searchQuery: string
        credentials: CredentialDto[]
    }
    const { credentials: initialCredentials, credentialDefinition, searchQuery }: Props = $props();
    let credentials: CredentialDto[] = $state(initialCredentials);

    async function onchange(credentialId: string, newValue: CredentialUpdateDto) {
        await updateCredential(apiProps, credentialId, newValue);
    }

    async function ondelete(credentialId: string, index: number) {
        await deleteCredential(apiProps, credentialId);
        unwrapOrNull(credentials)?.splice(index, 1)
    }

    const processedCredentials = $derived.by(() => {
        if (isErrorJson(credentials)) return [];

        const grouped: Partial<Record<CredentialScope, CredentialDto[]>> = {
            [CredentialScope.USER]: []
        };

        for (const credential of credentials) {
            if (searchQuery && !credential.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                continue;
            }

            let scope = credential.scope || "unknown";
            if (scope == CredentialScope.ROLE && credential.requiredRole) {
                scope = credential.requiredRole.name;
            }

            if (!grouped[scope]) {
                grouped[scope] = [];
            }
            grouped[scope].push(credential);
        }

        return Object.entries(grouped)
            .map(([scope, credentials]) => ({ scope, credentials: credentials }))
            .filter(({ credentials }) => credentials.length > 0);
    })
</script>

<div id="col-right" class="h-full overflow-y-auto">
    <div class="relative flex justify-center items-center mb-4">
        <CreateCredentialButton definition={credentialDefinition} oncreate={c => credentials.push(c)}/>
        <h2 class="h2 pt-0 leading-none">{credentialDefinition.displayName}</h2>
    </div>
    <ul>
        {#each processedCredentials as { scope, credentials } (credentials)}
            <li class="py-4">
                {#if scope === CredentialScope.GLOBAL}
                    <h4 class="h4">{scope[0].toUpperCase() + scope.slice(1).toLowerCase()}</h4>
                    <hr class="p-1">
                {:else if scope !== CredentialScope.USER}
                    <h4 class="h4">Role: {scope}</h4>
                    <hr class="p-1">
                {/if}
                <ul class="list-disc list-inside h-full space-y-2">
                    {#each credentials as credential, index}
                        <li class="list-none flex flex-row items-center gap-2">
                            <Credential {credential} {credentialDefinition} {onchange}/>
                            {#if credential.data != null} <!-- if we can read, we can delete -->
                                <div class="inline-block">
                                    <DeleteButton onconfirmed={() => ondelete(credential.id, index)}>
                                        {#snippet body()}
                                            <b>{credential.name}</b> will be gone forever. Are you sure?
                                        {/snippet}
                                    </DeleteButton>
                                </div>
                            {/if}
                        </li>
                    {/each}
                </ul>
            </li>
        {/each}
    </ul>
</div>
