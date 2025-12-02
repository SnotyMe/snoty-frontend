<script lang="ts">
    import {
        type CredentialDto,
        type CredentialRef,
        CredentialScope,
        type CredentialUpdateDto
    } from "$lib/model/credential";
    import { type ApiProps, isErrorJson } from "$lib/api/api";
    import { getContext } from "svelte";
    import { enumerateCredentials } from "$lib/api/credential_api";
    import type { CredentialDetails } from "$lib/model/node_field_details";
    import { FloatingPanel, Combobox, Portal, useListCollection } from "@skeletonlabs/skeleton-svelte";
    import IconMinus from "lucide-svelte/icons/minus";
    import IconGrid2x2Plus from "lucide-svelte/icons/grid-2x2-plus";
    import CredentialManagePanel from "$lib/components/credential/CredentialManagePanel.svelte";
    import { SquareAsterisk } from "@lucide/svelte"

    interface Props {
        details: CredentialDetails
        value: CredentialRef | null
        onchange: (value: CredentialRef | null) => void
    }

    let { details, value, onchange }: Props = $props();

    const apiProps = getContext<ApiProps>("apiProps");

    let credentials: CredentialDto[] = $state([]);

    async function refresh() {
        const res = await enumerateCredentials(apiProps, details.credentialType);
        if (isErrorJson(res)) {
            console.error(res);
            throw new Error(res.message);
        }
        credentials = res;
    }

    const credentialPromise = refresh();

    let query = $state("");

    const groupOrder = {
        [CredentialScope.USER]: 0,
        [CredentialScope.ROLE]: 1,
        [CredentialScope.GLOBAL]: 2,
    }
    const collection = $derived(
        useListCollection({
            items: credentials.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
            itemToString: (item) => item.name,
            itemToValue: (item) => item.id,
            groupBy: (item) => item.scope,
            groupSort: (a, b) => groupOrder[a as CredentialScope] - groupOrder[b as CredentialScope]
        }),
    );

    const onValueChange = (id: string) => {
        value = { credentialId: id }
        onchange(value)
    }

    function clearValue() {
        value = null
        onchange(value)
    }

    async function onCredentialCreated(credentialId: string) {
        await refresh();
        onValueChange(credentialId);
    }

    async function onCredentialChanged(credentialId: string, newValue: CredentialUpdateDto) {
        const credential = credentials
            .find(c => c.id === credentialId)
        console.log("changed cred", credential)
        if (!credential) return;
        credential.name = newValue.name ?? credential.name;
        value = { credentialId: credentialId, _timer: Date.now() } as CredentialRef;
    }
</script>

{#await credentialPromise}
    <Combobox>
        <Combobox.Control>
            <Combobox.Input />
            <Combobox.Trigger />
        </Combobox.Control>
    </Combobox>
{:then _}
    <Combobox value={value?.credentialId ? [value.credentialId] : []} {collection} onValueChange={e => onValueChange(e.value[0])}>
        <Combobox.Control class="w-full">
            <Combobox.Input/>
            {#if value?.credentialId}
                <button
                    class="skb:btn-icon skb:btn-icon-sm skb:preset-tonal skb:absolute skb:end-15.5 skb:top-1/2 skb:-translate-y-1/2"
                    onclick={clearValue}
                >
                    <IconMinus/>
                </button>
            {/if}
            <Combobox.Trigger class="skb:btn-icon skb:btn-icon-sm skb:preset-tonal skb:absolute skb:end-8.5 skb:top-1/2 skb:-translate-y-1/2"/>
            <CredentialManagePanel {details} credentialId={value?.credentialId ?? undefined} oncreate={onCredentialCreated} onchange={onCredentialChanged}>
                <FloatingPanel.Trigger class="skb:btn-icon skb:btn-icon-sm skb:preset-tonal skb:absolute skb:end-1.5 skb:top-1/2 skb:-translate-y-1/2">
                    {#if value?.credentialId}
                        <SquareAsterisk/>
                    {:else}
                        <IconGrid2x2Plus/>
                    {/if}
                </FloatingPanel.Trigger>
            </CredentialManagePanel>
        </Combobox.Control>
        <Portal>
            <Combobox.Positioner class="z-30!">
                <Combobox.Content class="bg-surface-100-900">
                    {#each collection.group() as [type, items] (type)}
                        <Combobox.ItemGroup>
                            <Combobox.ItemGroupLabel>{type}</Combobox.ItemGroupLabel>
                            {#each items as item (item.id)}
                                <Combobox.Item {item}>
                                    <Combobox.ItemText>{item.name}</Combobox.ItemText>
                                    <Combobox.ItemIndicator />
                                </Combobox.Item>
                            {/each}
                        </Combobox.ItemGroup>
                    {/each}
                </Combobox.Content>
            </Combobox.Positioner>
        </Portal>
    </Combobox>
{/await}
