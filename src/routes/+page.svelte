<script lang="ts">
    import type { LayoutServerData } from "./$types";
    import Page from "$lib/components/Page.svelte";

    interface Props {
        data: LayoutServerData
    }
    const { data }: Props = $props();
</script>

<Page>
    {#if data.user?.name}
        Welcome {data.user.name}.
    {:else}
        Welcome.
    {/if}
</Page>
