<script lang="ts">
    import { Dialog } from "@skeletonlabs/skeleton-svelte";
    import NodePopup from "$lib/components/node/popup/NodePopup.svelte";
    import IconPlus from "lucide-svelte/icons/plus";
    import LoadingButton from "$lib/components/LoadingButton.svelte";
    import { type CredentialDefinitionWithStatisticsDto, type CredentialDto } from "$lib/model/credential";
    import CredentialCreateForm from "$lib/components/credential/CredentialCreateForm.svelte";
    import type { CredentialCreateFormData } from "$lib/components/credential/credential_create_form";

    interface Props {
        definition: CredentialDefinitionWithStatisticsDto
        oncreate: (createdCredential: CredentialDto) => void
    }
    let { definition, oncreate }: Props = $props();

    let component: CredentialCreateForm;
    let form: CredentialCreateFormData | undefined = $state();
</script>

<NodePopup class="w-lg">
    {#snippet trigger()}
        <Dialog.Trigger class="absolute right-0 block">
            <IconPlus/>
        </Dialog.Trigger>
    {/snippet}
    {#snippet content()}
        <CredentialCreateForm bind:this={component} {definition} {oncreate} bind:form/>
    {/snippet}
    {#snippet actions()}
        <Dialog.CloseTrigger>
            <LoadingButton onclick={() => component.create()} disabled={form?.name === undefined || form.name.trim() === ""}>
                {#snippet idle()}
                    Create
                {/snippet}
            </LoadingButton>
        </Dialog.CloseTrigger>
    {/snippet}
</NodePopup>
