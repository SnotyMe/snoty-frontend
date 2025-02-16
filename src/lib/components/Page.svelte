<script lang="ts">
    import { PUBLIC_EXTRA_SCRIPT_URL } from "$env/static/public";
    import { env } from "$env/dynamic/public";

    const EXTRA_SCRIPT_URL = env.PUBLIC_EXTRA_SCRIPT_URL || PUBLIC_EXTRA_SCRIPT_URL;

    interface Props {
        pageName: string;
        description?: string;
        children: any;
    }

    const {
        pageName,
        description,
    }: Props = $props();
    const fullPageName = $derived(pageName ? pageName + " | Snoty" : "Snoty");
</script>

<svelte:head>
    {#if EXTRA_SCRIPT_URL}
        <script type="text/javascript" src={EXTRA_SCRIPT_URL} crossorigin="anonymous" defer></script>
    {/if}
    <!-- either 'pageName | Snoty' or 'Snoty' -->
    <title>{fullPageName}</title>
    <meta property="og:title" content={fullPageName}/>
    <meta property="og:image" content="/favicon.png"/>
    <meta property="og:description" content={description ?? "A low-code automation platform, specifically made for the educational sector."}/>
</svelte:head>

<!-- svelte 5 wants {@render children()} but it is buggy, duplicating content but only if <sveltekit:head> is present -->
<slot/>
