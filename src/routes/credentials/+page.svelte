<script lang="ts">
    import { type ApiProps } from "$lib/api/api";
    import { getContext } from "svelte";
    import { credentialsOverview } from "$lib/api/credential_api";
    import Page from "$lib/components/Page.svelte";
    import RightColumn from "./RightColumn.svelte";
    import HandleError from "$lib/components/HandleError.svelte";
    import LeftColumn from "./LeftColumn.svelte";

    const apiProps = getContext<ApiProps>("apiProps");

    const credentialPromise = credentialsOverview(apiProps)

    let selectedCredentialType = $state<string | null>(null);
</script>

<Page pageName="Credentials">
    {#await credentialPromise}
        <p>Loading...</p>
    {:then groupedCredentials}
        <HandleError element={groupedCredentials}>
            {#snippet success(groupedCredentials)}
                <div class="grid grid-cols-[25%_auto] w-full h-full gap-2">
                    <LeftColumn bind:selectedCredentialType {groupedCredentials}/>
                    <RightColumn {selectedCredentialType} credentialDefinition={groupedCredentials.find(c => c.type === selectedCredentialType) ?? null} />
                </div>
            {/snippet}
        </HandleError>
    {/await}
</Page>
