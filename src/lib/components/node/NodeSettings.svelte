<script lang="ts">
    import SettingsField from "$lib/components/node/SettingsField.svelte";
    import type { NodeMetadata } from "$lib/model/nodes";
    import type { SettingsStore } from "$lib/utils/settings.svelte";
    import { getFiltered } from "$lib/components/node/NodeSettings";
    import Plus from "lucide-svelte/icons/plus";
    import Minus from "lucide-svelte/icons/minus";
    import { getRecursively } from "$lib/utils/settings-utils.svelte";
    import { COLLECTION, collectionDetails } from "$lib/model/node_field_details";

    interface Props {
        settings: SettingsStore
        path?: string[]
        excludedKeys?: string[]
        metadata: NodeMetadata | undefined
        expanded?: boolean
        canRenameFields?: boolean
        canDeleteFields?: boolean
        isListItem?: boolean
    }

    const {
        settings,
        excludedKeys = [],
        path = [],
        canRenameFields = false,
        canDeleteFields = false,
        isListItem = false,
        metadata,
        expanded = false
    }: Props = $props();

    const filteredSettings = $derived(getFiltered(settings, path, excludedKeys))

    function getMetadata(key: string) {
        if (path?.length === 0) {
            return metadata?.settings.find(field => field.name === key);
        } else if (isListItem) {
            const field = metadata?.settings.find(field => field.name === path[path.length - 1]);
            if (!field) return null;

            // instead of the collection details, we want the details of the list items
            return {
                ...field,
                details: collectionDetails(field)?.elementDetails,
            }
        } else {
            return null;
        }
    }

    function getName(key: string) {
        return getMetadata(key)?.displayName ?? key;
    }

    function getDescription(key: string) {
        return getMetadata(key)?.description ?? "";
    }

    function getClonedList(): any[] | undefined {
        return getRecursively(settings.settings, path)?.slice()
    }

    function onchangeList(index: number, changedValue: any) {
        const newValues = getClonedList();
        if (!newValues) return;
        newValues[index] = changedValue;
        settings.setProperty(path, newValues);
    }

    function onchange(key: string, value: string) {
        settings.setProperty(pathKey(key), value)
    }

    function rename(oldKey: string, newKey: string) {
        settings.renameProperty(pathKey(oldKey), newKey);
    }

    function removeIndex(index: number) {
        const newValues = getClonedList()
        if (!newValues) return;
        newValues.splice(index, 1);
        settings.setProperty(path, newValues);
    }

    function remove(key: string) {
        settings.deleteProperty(pathKey(key));
    }

    function addItem(key: string, value: any[]) {
        settings.setProperty(pathKey(key), value.concat("new value"));
    }

    function addField(key: string) {
        settings.setProperty(path.concat(key, "newfield"), "new value");
    }

    function pathKey(key: string): string[] {
        return path.concat(key);
    }
</script>

<table class="table border-collapse">
    <tbody>
    {#each filteredSettings as [key, value], index}
        {#if typeof value == "object" && value !== null}
            {@const isMap = getMetadata(key)?.type === "Map"}
            {@const isList = getMetadata(key)?.type === "List" || getMetadata(key)?.type === COLLECTION}
            <tr>
                <th colspan="2">
                    <p title={getDescription(key)}>{getName(key)}</p>
                    <svelte:self
                            {expanded}
                            {settings}
                            {metadata}
                            {onchange}
                            path={pathKey(key)}
                            canRenameFields={isMap}
                            canDeleteFields={isMap || isList}
                            isListItem={isList}
                    />
                    {#if isMap || isList}
                        <button class="block m-auto" onclick={() => isList ? addItem(key, value) : addField(key)}>
                            <Plus/>
                        </button>
                    {/if}
                </th>
            </tr>
        {:else}
            <tr>
                {#if !isListItem}
                    <th title={getDescription(key)}>
                        {#if canRenameFields}
                            <SettingsField
                                {key}
                                value={key}
                                onchange={rename}
                                metadata={{details: { lines: 1 }}}
                            />
                        {:else}
                            {getName(key)}
                        {/if}
                    </th>
                {/if}
                <th colspan={isListItem ? 2 : 1} class="flex gap-2 flex-row items-center">
                    <SettingsField
                        {expanded}
                        onchange={(k, v) => isListItem ? onchangeList(index, v) : onchange(k, v)}
                        {key}
                        {value}
                        metadata={getMetadata(key)}
                    />
                    {#if canDeleteFields}
                        <button onclick={() => isListItem ? removeIndex(index) : remove(key)}>
                            <Minus/>
                        </button>
                    {/if}
                </th>
            </tr>
        {/if}
    {/each}
    </tbody>
</table>
