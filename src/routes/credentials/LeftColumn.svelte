<script lang="ts">
    import type { CredentialDefinitionWithStatisticsDto } from "$lib/model/credential";
    import IconChevronRight from "lucide-svelte/icons/chevron-right";

    interface Props {
        groupedCredentials: CredentialDefinitionWithStatisticsDto[]
        selectedCredentialType: string | null
        searchQuery: string
    }
    let { groupedCredentials, selectedCredentialType = $bindable(), searchQuery: search = $bindable("") }: Props = $props();

    const filteredCredentials = $derived(groupedCredentials.filter(c =>
        c.type == selectedCredentialType || c.displayName.toLowerCase().includes(search.toLowerCase())
    ))
</script>
<div id="col-left" class="h-full overflow-y-auto border-r-2 border-surface-300-700 [&>*]:border-b-2 [&>*]:border-surface-300-700">
    <input bind:value={search} class="input rounded-none ring-0" type="text" placeholder="Search..." />
    {#each filteredCredentials as {type, displayName, count}}
        <button
                class="w-full flex flex-row justify-between items-center preset-filled-surface-50-950 px-4 py-4"
                class:preset-filled-surface-200-800={selectedCredentialType === type}
                onclick={() => selectedCredentialType = (selectedCredentialType === type ? null : type)}
        >
            <div class="flex flex-col items-start">
                <span class="text-xl">{displayName}</span>
                <span class="text-sm">{count} credential(s) available</span>
            </div>

            <IconChevronRight/>
        </button>
    {/each}
</div>
