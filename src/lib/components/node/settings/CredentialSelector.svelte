<script lang="ts">
    import type { CredentialRef } from "$lib/model/credential";
    import { type ApiProps, isErrorJson } from "$lib/api/api";
    import { getContext } from "svelte";
    import { listCredentials } from "$lib/api/credential_api";
    import type { CredentialDetails } from "$lib/model/node_field_details";
    import { Combobox, type ComboboxRootProps, Portal, useListCollection } from "@skeletonlabs/skeleton-svelte";

    interface Props {
        details: CredentialDetails
        value: CredentialRef | null
    }

    let {details, value = $bindable()}: Props = $props();

    const apiProps = getContext<ApiProps>("apiProps");

    const credentials = await listCredentials(apiProps, details.credentialType)
        .then(res => {
            if (isErrorJson(res)) {
                console.error(res);
                throw new Error(res.message);
            }
            return res;
        });

    let query = $state("");

    const collection = $derived(
        useListCollection({
            items: credentials.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
            itemToString: (item) => item.name,
            itemToValue: (item) => item.id,
            groupBy: (item) => item.access,
        }),
    );

    const onValueChange: ComboboxRootProps['onValueChange'] = (event) => {
        value = { credentialId: event.value[0] }
    }
</script>

<Combobox {collection} {onValueChange}>
    <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger />
    </Combobox.Control>
    <Portal>
        <Combobox.Positioner class="z-[1]!">
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
