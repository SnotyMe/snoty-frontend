<script lang="ts">
    import type { NodeField } from "$lib/model/nodes";
    import { type CollectionDetails } from "$lib/model/node_field_details";
    import Plus from "lucide-svelte/icons/plus";
    import Minus from "lucide-svelte/icons/minus";
    import { getDefaultValue } from "$lib/model/node_field_defaults";
    import PolySettings from "$lib/components/node/settings/PolySettings.svelte";

    interface Props {
        values: any[]
        field: NodeField & {
            details: CollectionDetails
        }
    }
    const { values = $bindable(), field: externalField }: Props = $props();
    const elementDetails = externalField.details.elementDetails;
    const field = {
        ...externalField,
        type: elementDetails.type,
        details: elementDetails,
    };
</script>

<table class="table border-collapse">
    <tbody>
    {#each values as _, i}
        <tr>
            <th class="flex gap-2 flex-row items-center">
                <PolySettings bind:value={values[i]} {field}/>
                <button onclick={() => values.splice(i, 1)}>
                    <Minus/>
                </button>
            </th>
        </tr>
    {/each}
    </tbody>
</table>
<button class="block m-auto" onclick={() => values.push(getDefaultValue(field))}>
    <Plus/>
</button>
