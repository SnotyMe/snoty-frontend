<script lang="ts">

    import SettingsField from "$lib/components/node/SettingsField.svelte";
    import type { NodeMetadata } from "$lib/model/nodes";
    import type { SettingsStore } from "$lib/utils/settings.svelte";
    import { getRecursively } from "$lib/utils/utils";
    import { getFiltered } from "$lib/components/node/NodeSettings.js";

    interface Props {
        settings: SettingsStore
        path?: string | null
        metadata: NodeMetadata | undefined
        expanded?: boolean
    }

    const {
        settings,
        path = null,
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
        if (path != null)
            settings.setProperty(path + "." + key, value);
        else
            settings.setProperty(key, value);
    }

    function pathKey(key: string): string {
        return path ? `${path}.${key}` : key
    }
</script>

<table class="table border-collapse">
    <tbody>
    {#each filteredSettings as [key, value]}
        {#if typeof value == "object"}
            <tr>
                <th colspan="2">
                    <p title={getDescription(key)}>{getName(key)}</p>
                    <svelte:self
                            {expanded}
                            {settings}
                            {metadata}
                            {onchange}
                            path={pathKey(key)}
                    />
                </th>
            </tr>
        {:else}
            <tr>
                <th title={getDescription(key)}>{getName(key)}</th>
                <th>
                    {#key getRecursively(settings.settings, pathKey(key))}
                        <SettingsField
                                {expanded}
                                onchange={onchange}
                                {key}
                                value={getRecursively(settings.settings, pathKey(key))}
                                metadata={metadata?.settings.find(field => field.name === key)}
                        />
                    {/key}
                </th>
            </tr>
        {/if}
    {/each}
    </tbody>
</table>
