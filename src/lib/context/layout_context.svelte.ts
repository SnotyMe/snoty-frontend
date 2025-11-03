import { getContext, setContext } from 'svelte';
import * as toast from '@zag-js/toast';
import type { ApiProps } from "$lib/api/api";
import type { Role } from "$lib/model/user";

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

const apiPropsKey = "apiProps"
export function setApiProps(apiProps: ApiProps) {
    setContext(apiPropsKey, apiProps);
}

export function getApiProps(): ApiProps {
    return getContext(apiPropsKey);
}

const rolesContext = "roles"
export function setRoles(roles: Role[]) {
    setContext(rolesContext, roles);
}

export function getRoles(): Role[] {
    return getContext(rolesContext);
}
