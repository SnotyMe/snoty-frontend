<script lang="ts">
    import type { CredentialRef } from "$lib/model/credential";
    import { type ApiProps, isErrorJson } from "$lib/api/api";
    import { getContext } from "svelte";
    import { enumerateCredentials } from "$lib/api/credential_api";
    import type { CredentialDetails } from "$lib/model/node_field_details";

    interface Props {
        details: CredentialDetails
        value: CredentialRef
    }

    const { value = $bindable(), details }: Props = $props();

    const apiProps = getContext<ApiProps>("apiProps");

    const availableValues = enumerateCredentials(apiProps, details.credentialType)
        .then(res => {
            if (isErrorJson(res)) {
                console.error(res);
                throw new Error(res.message);
            }
            return res;
        });
</script>

<select class="select" onchange={e => value.credentialId = e.target.value}>
    {#await availableValues then credentials}
        <option value="" disabled selected={!value.credentialId}>Select credential</option>
        {#each credentials as credential}
            <option value={credential.id} selected={credential.id === value.credentialId}>{credential.name}</option>
        {/each}
    {:catch _}
        <option disabled selected>Error loading credentials</option>
    {/await}
</select>
