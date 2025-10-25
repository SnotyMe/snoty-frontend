<script lang="ts">
    import { type ApiProps, isErrorJson } from "$lib/api/api";
    import { getContext } from "svelte";
    import { credentialsOverview } from "$lib/api/credential_api";
    import Page from "$lib/components/Page.svelte";
    import RightColumn from "./RightColumn.svelte";
    import HandleError from "$lib/components/HandleError.svelte";
    import LeftColumn from "./LeftColumn.svelte";

    const apiProps = getContext<ApiProps>("apiProps");

    const credentialPromise = credentialsOverview(apiProps)
    const groupedCredentials = await credentialPromise;

    let selectedCredentialType = $state<string | null>(null);
    const credentialDefinition = $derived(
        isErrorJson(groupedCredentials) ? null : groupedCredentials.find(c => c.type === selectedCredentialType) ?? null
    )

    let searchQuery: string = $state("");
</script>

<Page pageName="Credentials">
    <HandleError element={groupedCredentials}>
        {#snippet success(groupedCredentials)}
            <div class="grid grid-cols-[25%_auto] w-full h-full gap-2">
                <LeftColumn bind:selectedCredentialType {groupedCredentials} bind:searchQuery/>

                <div class="p-4">
                    {#if selectedCredentialType == null || credentialDefinition == null}
                        <p class="text-center text-surface-500">Select a credential type to view details.</p>
                    {:else}
                        {#key selectedCredentialType}
                            <RightColumn {selectedCredentialType} {credentialDefinition} {searchQuery} />
                        {/key}
                    {/if}
                </div>
            </div>
        {/snippet}
    </HandleError>
</Page>
