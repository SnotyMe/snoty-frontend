<script lang="ts">
    import { page } from "$app/stores";
    import { PUBLIC_EXTRA_SCRIPT_URL } from "$env/static/public";
    import { env } from "$env/dynamic/public";

    const EXTRA_SCRIPT_URL = env.PUBLIC_EXTRA_SCRIPT_URL || PUBLIC_EXTRA_SCRIPT_URL;

    let user = $page.data.user;

    interface Props {
        pageName: string;
        showPageName: boolean;
        class: string;
        children: any;
    }

    const {
        pageName,
        class: classes = "",
    }: Props = $props();

    let expanded = false;
</script>

<sveltekit:head>
    {#if EXTRA_SCRIPT_URL}
        <script type="text/javascript" src={EXTRA_SCRIPT_URL} crossorigin="anonymous" defer></script>
    {/if}
    <!-- either 'pageName | Snoty' or 'Snoty' -->
    <title>{pageName ? pageName + " | " : ""}Snoty</title>
</sveltekit:head>

<!-- svelte 5 wants {@render children()} but it is buggy, duplicating content but only if <sveltekit:head> is present -->
<slot/>
