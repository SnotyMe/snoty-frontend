import { getContext, setContext } from 'svelte';
import * as toast from '@zag-js/toast';

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

const toasterKey = "toaster"
export function setToaster(toaster: toast.Store<any>) {
    setContext(toasterKey, toaster);
}

export function getToaster() {
    return getContext(toasterKey) as toast.Store<any>;
}

export function initContext() {
    setContext(themingKey, theming);
}
