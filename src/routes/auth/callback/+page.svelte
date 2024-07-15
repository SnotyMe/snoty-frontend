<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import type { PageData } from "./$types";

    const { data }: { data: PageData } = $props();
</script>

<Page pageName="Logging in...">
    {#await data.result}
        Please wait while we log you in...
    {:then result}
        {#if result.error || result.code >= 400}
            <p>An error occurred trying to sign you in: {result.message}</p>
        {:else}
            <p>Welcome. Please wait while we redirect you...</p>
            <script>
                window.location.href = "/";
            </script>
        {/if}
    {/await}
</Page>
