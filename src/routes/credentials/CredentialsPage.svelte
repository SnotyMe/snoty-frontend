<script lang="ts">
    import LeftColumn from "./LeftColumn.svelte";
    import type { CredentialDefinitionWithStatisticsDto } from "$lib/model/credential";
    import RightColumn from "./RightColumn.svelte";
    import { listCredentials } from "$lib/api/credential_api";
    import HandleError from "$lib/components/HandleError.svelte";
    import type { ApiProps } from "$lib/api/api";
    import { getContext } from "svelte";

    const apiProps = getContext<ApiProps>("apiProps");

    interface Props {
        groupedCredentials: CredentialDefinitionWithStatisticsDto[]
    }

    const { groupedCredentials }: Props = $props();

    const credentialDefinition = $derived(groupedCredentials
        .find(c => c.type === selectedCredentialType) ?? null
    )

    let searchQuery: string = $state("");
    let selectedCredentialType = $state<string | null>(null);
</script>

<div class="grid grid-cols-[25%_auto] w-full h-full gap-2">
    <LeftColumn bind:selectedCredentialType {groupedCredentials} bind:searchQuery/>

    <div class="p-4">
        {#if selectedCredentialType == null || credentialDefinition == null}
            <p class="text-center text-surface-500">Select a credential type to view details.</p>
        {:else}
            {#await listCredentials(apiProps, selectedCredentialType) then credentials}
                <HandleError element={credentials}>
                    {#snippet success(credentials)}
                        <RightColumn {credentials} {selectedCredentialType} {credentialDefinition} {searchQuery}/>
                    {/snippet}
                </HandleError>
            {/await}
        {/if}
    </div>
</div>
