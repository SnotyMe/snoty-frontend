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

    function rename(oldName: string, newName: string) {
        settings[newName] = settings[oldName];
        delete settings[oldName];
    }
</script>

<table class="table border-collapse">
    <tbody>
    {#each Object.entries(settings) as [key, _]}
        <tr class="w-full">
            <th>
                <input type="text" class="input-field" value={key} onchange={(e) => rename(key, e.currentTarget.value)}/>
            </th>
            <th>
                <PolySettings
                    bind:value={settings[key]}
                    field={valueField}
                />
            </th>
            <th>
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
