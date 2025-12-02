<script lang="ts">
    import { Dialog } from "@skeletonlabs/skeleton-svelte";
    import { twMerge } from "tailwind-merge";
    import { hasAnyRole, ROLE_ADMIN } from "$lib/utils/user_utils";
    import { getRoles } from "$lib/context/layout_context.svelte";
    import {
        type CredentialCreateDto,
        type CredentialDefinition,
        type CredentialDto,
        CredentialScope
    } from "$lib/model/credential";
    import { defaultRecordFromSchema } from "$lib/utils/settings_utils";
    import { createCredential } from "$lib/api/credential_api";
    import { type ApiProps, isErrorJson } from "$lib/api/api";
    import { getContext } from "svelte";
    import type { CredentialCreateFormData } from "$lib/components/credential/credential_create_form";

    interface Props {
        definition: CredentialDefinition;
        oncreate: (createdCredential: CredentialDto) => void
        form: CredentialCreateFormData | undefined
        titleClass?: string
    }
    let { definition, oncreate, form = $bindable(), titleClass }: Props = $props();
    const initialValue: CredentialCreateFormData = {
        scope: CredentialScope.USER,
        type: definition.type,
        name: "",
        role: null,
        data: defaultRecordFromSchema(definition.schema),
    };
    form = { ...initialValue };

    const apiProps: ApiProps = getContext<ApiProps>("apiProps");
    const roles = getRoles()

    export async function create() {
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

        form = { ...initialValue }
    }
</script>

<h1 class={twMerge("h1 text-center", titleClass)}>Create Credential</h1>
<form class="space-y-4">
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
