<script lang="ts">
    import { type ApiProps, isErrorJson } from "$lib/api/api";
    import NodePopup from "$lib/components/node/popup/NodePopup.svelte";
    import IconPlus from "lucide-svelte/icons/plus";
    import LoadingButton from "$lib/components/LoadingButton.svelte";
    import { getContext } from "svelte";
    import { createCredential } from "$lib/api/credential_api";
    import type { CredentialCreateDto, CredentialDefinitionWithStatisticsDto } from "$lib/model/credential";
    import { defaultRecordFromSchema } from "$lib/utils/settings_utils";
    import { Dialog } from "@skeletonlabs/skeleton-svelte";

    interface Props {
        definition: CredentialDefinitionWithStatisticsDto
        oncreate: () => void
    }
    let { definition, oncreate }: Props = $props();

    const apiProps: ApiProps = getContext<ApiProps>("apiProps");

    const initialValue = {
        type: definition.type,
        name: "",
        data: defaultRecordFromSchema(definition.schema),
    };
    let createDto: CredentialCreateDto = $state(initialValue);

    async function create() {
        if (!createDto) {
            console.error("Credential is null");
            return;
        }

        const createdCredential = await createCredential(apiProps, createDto);
        if (isErrorJson(createdCredential)) {
            throw createdCredential;
        }

        oncreate()

        createDto = initialValue;
    }
</script>

<NodePopup class="w-lg">
    {#snippet trigger()}
        <Dialog.Trigger class="block mx-auto mt-4">
            <IconPlus/>
        </Dialog.Trigger>
    {/snippet}
    {#snippet content()}
        <Dialog.Title class="h1 text-center">Create Credential</Dialog.Title>
        <form class="space-y-2 p-2">
            <div class="flex justify-between mb-2">
                <label class="label">
                    <span class="label-text">Name <span class="text-red-500">*</span></span>
                    <input class="input" placeholder="Enter Credential Name" bind:value={createDto.name}/>
                    <small class="whitespace-pre-line">You can always change this later.</small>
                </label>
            </div>
        </form>
    {/snippet}
    {#snippet actions()}
        <LoadingButton onclick={create} disabled={createDto.name === ""}>
            {#snippet idle()}
                Create
            {/snippet}
        </LoadingButton>
    {/snippet}
</NodePopup>
