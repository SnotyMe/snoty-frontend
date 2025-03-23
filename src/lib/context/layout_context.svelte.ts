import { getContext, setContext } from 'svelte';

const themingKey = "theming"
interface Theming {
    colorScheme: App.ColorScheme | null
}

let theming: Theming = $state({
    colorScheme: null
})

export function setColorScheme(colorScheme: App.ColorScheme) {
    theming.colorScheme = colorScheme;
}

export function getTheming() {
    return getContext(themingKey) as Theming;
}


export function initContext() {
    setContext(themingKey, theming);
}
