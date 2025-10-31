<script lang="ts">
    import { type ApiProps } from "$lib/api/api";
    import { getContext } from "svelte";
    import { credentialsOverview } from "$lib/api/credential_api";
    import Page from "$lib/components/Page.svelte";
    import HandleError from "$lib/components/HandleError.svelte";
    import CredentialsPage from "./CredentialsPage.svelte";

    const apiProps = getContext<ApiProps>("apiProps");

    const credentialPromise = credentialsOverview(apiProps)
</script>

<Page pageName="Credentials">
    {#await credentialPromise then groupedCredentials}
        <HandleError element={groupedCredentials}>
            {#snippet success(groupedCredentials)}
                <CredentialsPage {groupedCredentials}/>
            {/snippet}
        </HandleError>
    {/await}
</Page>
