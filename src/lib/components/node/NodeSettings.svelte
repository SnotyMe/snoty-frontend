<script lang="ts">

    import SettingsField from "$lib/components/node/SettingsField.svelte";
    import type { NodeMetadata } from "$lib/model/nodes";
    import type { SettingsStore } from "$lib/utils/settings.svelte";
    import { getRecursively } from "$lib/utils/utils";
    import { getFiltered } from "$lib/components/node/NodeSettings.js";
    import Plus from "lucide-svelte/icons/plus";

    interface Props {
        settings: SettingsStore
        path?: string | null
        metadata: NodeMetadata | undefined
        expanded?: boolean
        canRenameFields?: boolean
    }

    const {
        settings,
        path = null,
        canRenameFields = false,
        metadata,
        expanded = false
    }: Props = $props();

    const filteredSettings = $derived(getFiltered(settings, path))

    function getMetadata(key: string) {
        return metadata?.settings.find(field => field.name === key);
    }

    function getName(key: string) {
        return getMetadata(key)?.displayName ?? key;
    }

    function getDescription(key: string) {
        return getMetadata(key)?.description ?? "";
    }

    function onchange(key: string, value: any) {
        settings.setProperty(path, key, value)
    }

    function rename(oldKey: string, newKey: string) {
        settings.renameProperty(path, oldKey, newKey);
    }

    function pathKey(key: string): string {
        return path ? `${path}.${key}` : key
    }
</script>

<table class="table border-collapse">
    <tbody>
    {#key filteredSettings}
    {#each filteredSettings as [key, _]}
        {@const fullPath = pathKey(key)}
        {@const value = getRecursively(settings.settings, fullPath)}
        {@const fieldName = getName(key)}
        {#if typeof value == "object"}
            <tr>
                <th colspan="2">
                    <p title={getDescription(key)}>{fieldName}</p>
                    <svelte:self
                            {expanded}
                            {settings}
                            {metadata}
                            {onchange}
                            path={pathKey(key)}
                            canRenameFields={getMetadata(key)?.type === "Map"}
                    />
                    <button class="block m-auto" onclick={() => onchange(fullPath, { newfield: "", ...value })}>
                        <Plus/>
                    </button>
                </th>
            </tr>
        {:else}
            <tr>
                <th title={getDescription(key)}>
                    {#if canRenameFields}
                        <SettingsField {key} value={key} onchange={(key, value) => rename(key, value)}/>
                    {:else}
                        {fieldName}
                    {/if}
                </th>
                <th>
                    {#key getRecursively(settings.settings, pathKey(key))}
                        <SettingsField
                                {expanded}
                                onchange={onchange}
                                {key}
                                {value}
                                metadata={metadata?.settings.find(field => field.name === key)}
                        />
                    {/key}
                </th>
            </tr>
        {/if}
    {/each}
    {/key}
    </tbody>
</table>
