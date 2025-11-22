<script lang="ts">
    import { type ApiProps, isErrorJson } from "$lib/api/api";
    import NodePopup from "$lib/components/node/popup/NodePopup.svelte";
    import IconPlus from "lucide-svelte/icons/plus";
    import LoadingButton from "$lib/components/LoadingButton.svelte";
    import { getContext } from "svelte";
    import { createCredential } from "$lib/api/credential_api";
    import {
        type CredentialCreateDto,
        type CredentialDefinitionWithStatisticsDto,
        type CredentialDto, CredentialScope
    } from "$lib/model/credential";
    import { defaultRecordFromSchema } from "$lib/utils/settings_utils";
    import { Dialog } from "@skeletonlabs/skeleton-svelte";
    import { getRoles } from "$lib/context/layout_context.svelte";
    import { hasAnyRole, ROLE_ADMIN } from "$lib/utils/user_utils";

    interface Props {
        definition: CredentialDefinitionWithStatisticsDto
        oncreate: (createdCredential: CredentialDto) => void
    }
    let { definition, oncreate }: Props = $props();

    const apiProps: ApiProps = getContext<ApiProps>("apiProps");

    type CredentialCreateForm = Omit<CredentialCreateDto, "role"> & { scope: CredentialScope; role: string | null };

    const initialValue: CredentialCreateForm = {
        scope: CredentialScope.USER,
        type: definition.type,
        name: "",
        role: null,
        data: defaultRecordFromSchema(definition.schema),
    };
    let form: CredentialCreateForm = $state(initialValue);

    async function create() {
        if (!form) {
            console.error("Credential is null");
            return;
        }

        const createDto: CredentialCreateDto = {
            ...form,
            role: form.role ? { name: form.role } : null,
        };

        const createdCredential = await createCredential(apiProps, createDto);
        if (isErrorJson(createdCredential)) {
            throw createdCredential;
        }

        oncreate(createdCredential)

        form = initialValue;
    }

    const roles = getRoles()
</script>

<NodePopup class="w-lg">
    {#snippet trigger()}
        <Dialog.Trigger class="absolute right-0 block">
            <IconPlus/>
        </Dialog.Trigger>
    {/snippet}
    {#snippet content()}
        <Dialog.Title class="h1 text-center">Create Credential</Dialog.Title>
        <form class="space-y-4 p-2">
            <label class="label">
                <span class="label-text">Name <span class="text-red-500">*</span></span>
                <input class="input" placeholder="Enter Credential Name" bind:value={form.name}/>
                <small class="whitespace-pre-line">You can always change this later.</small>
            </label>
            {#if hasAnyRole(roles, ROLE_ADMIN)}
                <label class="label">
                    <span class="label-text">Scope</span>
                    <select class="select" bind:value={form.scope}>
                        <option value={CredentialScope.USER}>User</option>
                        <option value={CredentialScope.ROLE}>Role</option>
                        <option value={CredentialScope.GLOBAL}>Global</option>
                    </select>
                </label>
                <label class="label">
                    {#if form.scope === CredentialScope.ROLE}
                        <span class="label-text">Role</span>
                        <input class="input" placeholder="Enter Required Role" bind:value={form.role}/>
                        <small class="whitespace-pre-line text-error-500">This cannot be changed later.</small>
                    {/if}
                </label>
            {/if}
        </form>
    {/snippet}
    {#snippet actions()}
        <Dialog.CloseTrigger>
            <LoadingButton onclick={create} disabled={form.name === ""}>
                {#snippet idle()}
                    Create
                {/snippet}
            </LoadingButton>
        </Dialog.CloseTrigger>
    {/snippet}
</NodePopup>
