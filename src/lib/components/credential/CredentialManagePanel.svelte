<script lang="ts">
    import { GripVerticalIcon, MaximizeIcon, MinimizeIcon, MinusIcon, XIcon } from "@lucide/svelte";
    import { FloatingPanel, Portal } from '@skeletonlabs/skeleton-svelte';
    import CredentialCreateForm from "$lib/components/credential/CredentialCreateForm.svelte";
    import type { CredentialCreateFormData } from "$lib/components/credential/credential_create_form";
    import type { CredentialDefinition, CredentialDto, CredentialUpdateDto } from "$lib/model/credential";
    import type { CredentialDetails } from "$lib/model/node_field_details";
    import LoadingButton from "$lib/components/LoadingButton.svelte";
    import Credential from "../../../routes/credentials/Credential.svelte";
    import { getCredential, updateCredential } from "$lib/api/credential_api";
    import { getContext } from "svelte";
    import type { ApiProps } from "$lib/api/api";
    import { isErrorJson } from "$lib/api/api";

    const apiProps = getContext<ApiProps>("apiProps");

    interface Props {
        details: CredentialDetails
        credentialId: string | undefined
        oncreate: (credentialId: string) => void
        onchange: (credentialId: string, newValue: CredentialUpdateDto) => void
    }
    let { details, credentialId, oncreate: upstreamCreate, onchange: upstreamChange }: Props = $props();

    let component: CredentialCreateForm;
    let form: CredentialCreateFormData | undefined = $state();

    const definition: CredentialDefinition = {
        type: details.credentialType,
        schema: details.schema,
    };

    let credential: CredentialDto | undefined = $state()

    $effect(() => {
        if (!credentialId) {
            credential = undefined;
            return;
        }
        void getCredential(apiProps, credentialId)
            .then((res) => isErrorJson(res) ? null : credential = res)
    })

    function oncreate(createdCredential: CredentialDto) {
        credential = createdCredential
        upstreamCreate(createdCredential.id)
    }

    async function onchange(credentialId: string, newValue: CredentialUpdateDto) {
        await updateCredential(apiProps, credentialId, newValue);
        upstreamChange(credentialId, newValue);
    }
</script>

<FloatingPanel defaultSize={{ width: 400, height: 500 }}>
    <slot/>
    <Portal>
        <FloatingPanel.Positioner class="z-50">
            <FloatingPanel.Content class="flex flex-col">
                <FloatingPanel.DragTrigger>
                    <FloatingPanel.Header>
                        <FloatingPanel.Title>
                            <GripVerticalIcon class="size-4" />
                            Manage Credential
                        </FloatingPanel.Title>
                        <FloatingPanel.Control>
                            <FloatingPanel.StageTrigger stage="minimized">
                                <MinusIcon class="size-4" />
                            </FloatingPanel.StageTrigger>
                            <FloatingPanel.StageTrigger stage="maximized">
                                <MaximizeIcon class="size-4" />
                            </FloatingPanel.StageTrigger>
                            <FloatingPanel.StageTrigger stage="default">
                                <MinimizeIcon class="size-4" />
                            </FloatingPanel.StageTrigger>
                            <FloatingPanel.CloseTrigger>
                                <XIcon className="size-4" />
                            </FloatingPanel.CloseTrigger>
                        </FloatingPanel.Control>
                    </FloatingPanel.Header>
                </FloatingPanel.DragTrigger>
                <FloatingPanel.Body>
                    <div class="flex flex-col h-full justify-between gap-4">
                        {#if !credential && !credentialId}
                            <div>
                                <CredentialCreateForm bind:this={component} {definition} {oncreate} titleClass="h5" bind:form/>
                            </div>
                            <LoadingButton class="float-right" onclick={() => component.create()} disabled={form?.name === undefined || form.name.trim() === ""}>
                                {#snippet idle()}
                                    Create
                                {/snippet}
                            </LoadingButton>
                        {:else if credential}
                            <Credential {credential} credentialDefinition={definition} {onchange}/>
                        {/if}
                    </div>
                </FloatingPanel.Body>
                <FloatingPanel.ResizeTrigger axis="se" />
            </FloatingPanel.Content>
        </FloatingPanel.Positioner>
    </Portal>
</FloatingPanel>
