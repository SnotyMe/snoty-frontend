<script lang="ts">
    import type { NodeField } from "$lib/model/nodes";
    import { type MapDetails } from "$lib/model/node_field_details";
    import Plus from "lucide-svelte/icons/plus";
    import Minus from "lucide-svelte/icons/minus";
    import { getDefaultValue } from "$lib/model/node_field_defaults";
    import PolySettings from "$lib/components/node/settings/PolySettings.svelte";

    interface Props {
        settings: Record<any, any>
        field: NodeField & {
            details: MapDetails
        }
    }
    const { settings = $bindable(), field }: Props = $props();
    const keyDetails = field.details.keyDetails;
    const valueDetails = field.details.valueDetails;

    const keyField = {
        ...field,
        type: keyDetails.type,
        details: keyDetails,
    };
    const valueField = {
        ...field,
        type: valueDetails.type,
        details: valueDetails,
    };

    let keyStates: Record<string, string> = $state({})

    function rename(oldName: string, newName: string) {
        if (oldName === newName) return;

        settings[newName] = settings[oldName];
        delete settings[oldName];

        keyStates[newName] = keyStates[oldName];
        delete keyStates[oldName];
    }
</script>

<table class="table border-collapse">
    <tbody>
    {#each Object.entries(settings) as [key, _]}
        <tr>
            <th>
                {#key key}
                    <input class="input-field"
                           value={key}
                           oninput={e => keyStates[key] = e.target.value}
                           onblur={e => rename(key, e.target.value)}/>
                    <!-- `-mx-1` accounts for the width of the ' characters -->
                    <div class="input-field -mx-1 invisible h-0">'{keyStates[key] ?? key}'</div>
                {/key}
            </th>
            <th class="w-full">
                <PolySettings
                    bind:value={settings[key]}
                    field={valueField}
                />
            </th>
            <th class="align-middle">
                <button onclick={() => { delete settings[key] }}>
                    <Minus/>
                </button>
            </th>
        </tr>
    {/each}
    </tbody>
</table>
<button class="block m-auto" onclick={() => settings[getDefaultValue(keyField) || "newkey"] = getDefaultValue(valueField)}>
    <Plus/>
</button>
