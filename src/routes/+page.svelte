<script lang="ts">
    import type { LayoutServerData } from "./$types";
    import Page from "$lib/components/Page.svelte";

    interface Props {
        data: LayoutServerData
    }
    const { data }: Props = $props();
</script>

<Page>
    <div class="space-y-2 text-center">
        {#if data.user?.name}
            <p>Welcome {data.user.name}.</p>
            <a href={`/flows`} class="btn preset-filled">
                <span>My Flows</span>
                <span>&rarr;</span>
            </a>
        {:else}
            <p>Welcome.</p>
            <a href={`/auth/login`} class="btn preset-filled">
                <span>Log in</span>
                <span>&rarr;</span>
            </a>
        {/if}
    </div>
</Page>
