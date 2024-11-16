<script lang="ts">
    import IconPalette from "lucide-svelte/icons/palette"
    import IconMoon from "lucide-svelte/icons/moon"
    import IconSun from "lucide-svelte/icons/sun"
    import { themes } from "$lib/components/theme/index";
    import { Switch } from "@skeletonlabs/skeleton-svelte";
    import { untrack } from "svelte";

    interface Props {
        currentTheme: string;
        setTheme: (theme: string) => void;
        currentColorScheme: string;
        toggleColorScheme: () => void;
    }

    const { currentTheme, setTheme, toggleColorScheme, currentColorScheme }: Props = $props()
    let mode = $state(currentColorScheme === "light");

    function explicitEffect(fn, depsFn) {
        $effect(() => {
            depsFn();
            untrack(fn);
        });
    }

    let initial = true;
    explicitEffect(() => {
        if (initial) {
            initial = false
            return
        }
        toggleColorScheme()
    }, () => [mode])
</script>

<div class="flex flex-col justify-center text-center">
    <h2 class="h2">Theme</h2>
    <div class="flex flex-row">
        <!-- TODO: use onchange (https://github.com/skeletonlabs/skeleton/issues/2882) -->
        <Switch name="mode" controlActive="bg-surface-200" bind:checked={mode}>
            {#snippet inactiveChild()}<IconMoon size="14" />{/snippet}
            {#snippet activeChild()}<IconSun size="14" />{/snippet}
        </Switch>
        <div class="input-group grid-cols-[auto_1fr] hover:preset-tonal">
            <div class="input-group-cell">
                <IconPalette size={18} />
            </div>
            <select onchange={e => setTheme(e.target.value)}>
                <!-- Loop and generate theme list automatically -->
                {#each themes as {name, displayName}}
                    <option value={name} selected={currentTheme === name}>
                        {displayName}
                    </option>
                {/each}
            </select>
        </div>
    </div>
</div>
