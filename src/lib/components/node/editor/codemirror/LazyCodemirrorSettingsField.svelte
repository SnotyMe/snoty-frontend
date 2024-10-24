<script lang="ts">
    import { onMount, type SvelteComponent } from "svelte";

    let CodemirrorSettingsField: null | typeof SvelteComponent;

    onMount(async () => {
        const module = await import("./CodemirrorSettingsField.svelte")
        CodemirrorSettingsField = module.default as typeof SvelteComponent;
    })
</script>

{#if CodemirrorSettingsField}
    <CodemirrorSettingsField {...$$restProps}/>
{/if}
