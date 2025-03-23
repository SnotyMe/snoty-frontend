<script lang="ts">
    import IconPalette from "lucide-svelte/icons/palette"
    import IconMoon from "lucide-svelte/icons/moon"
    import IconSun from "lucide-svelte/icons/sun"
    import { themes } from "$lib/components/theme/index";
    import { Switch } from "@skeletonlabs/skeleton-svelte";

    interface Props {
        currentTheme: string;
        setTheme: (theme: string) => void;
        currentColorScheme: string;
        toggleColorScheme: () => void;
    }

    const { currentTheme, setTheme, toggleColorScheme, currentColorScheme }: Props = $props();
</script>

<div class="flex flex-row justify-center gap-2">
    <Switch name="mode" controlActive="bg-surface-200" checked={currentColorScheme === "light"} onCheckedChange={toggleColorScheme}>
        {#snippet inactiveChild()}<IconMoon size="14"/>{/snippet}
        {#snippet activeChild()}<IconSun size="14"/>{/snippet}
    </Switch>
    <div class="input-group grid-cols-[auto_1fr] hover:preset-tonal">
        <div class="ig-cell">
            <IconPalette size={18} />
        </div>
        <select class="ig-select" onchange={e => setTheme(e.target.value)}>
            <!-- Loop and generate theme list automatically -->
            {#each themes as {name, displayName}}
                <option value={name} selected={currentTheme === name}>
                    {displayName}
                </option>
            {/each}
        </select>
    </div>
</div>
