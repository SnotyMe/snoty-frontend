<script lang="ts">
    import { API_URL } from "$lib/api/api";
    import type { Workflow } from "$lib/model/flows";
    import IconShare from "lucide-svelte/icons/share-2";

    interface Props {
        flow: Workflow;
    }

    const { flow }: Props = $props();
</script>

<a href={API_URL + "/wiring/flow/" + flow._id + "/export"}
   download
   target="_blank"
   class="svelte-flow__controls-button no-fill">
    <IconShare/>
</a>
