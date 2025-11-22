<script lang="ts">
    import { type CredentialDto, type CredentialRef, CredentialScope } from "$lib/model/credential";
    import { type ApiProps, isErrorJson } from "$lib/api/api";
    import { getContext } from "svelte";
    import { enumerateCredentials } from "$lib/api/credential_api";
    import type { CredentialDetails } from "$lib/model/node_field_details";
    import { Combobox, type ComboboxRootProps, Portal, useListCollection } from "@skeletonlabs/skeleton-svelte";
    import IconMinus from "lucide-svelte/icons/minus";

    interface Props {
        details: CredentialDetails
        value: CredentialRef | null
        onchange: (value: CredentialRef | null) => void
    }

    let { details, value, onchange }: Props = $props();

    const apiProps = getContext<ApiProps>("apiProps");

    let credentials: CredentialDto[] = $state([]);
    const credentialPromise = enumerateCredentials(apiProps, details.credentialType)
        .then(res => {
            if (isErrorJson(res)) {
                console.error(res);
                throw new Error(res.message);
            }
            credentials = res;
        });

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

    const onValueChange: ComboboxRootProps['onValueChange'] = (event) => {
        value = { credentialId: event.value[0] }
        onchange(value)
    }

    function clearValue() {
        value = null
        onchange(value)
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
    <Combobox value={value?.credentialId ? [value.credentialId] : []} {collection} {onValueChange}>
        <Combobox.Control class="w-full">
            <Combobox.Input />
            {#if value?.credentialId}
                <button
                    class="skb:btn-icon skb:btn-icon-sm skb:preset-tonal skb:absolute skb:end-8.5 skb:top-1/2 skb:-translate-y-1/2"
                    onclick={clearValue}
                >
                    <IconMinus/>
                </button>
            {/if}
            <Combobox.Trigger class="skb:btn-icon skb:btn-icon-sm skb:preset-tonal skb:absolute skb:end-1.5 skb:top-1/2 skb:-translate-y-1/2"/>
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
