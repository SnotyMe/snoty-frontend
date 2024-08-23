import type { LayoutServerLoad } from "./$types";
import { browser } from "$app/environment";

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
    if (!browser) return;

    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    if (locals?.colorScheme !== theme) {
        const expiration = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = `theme=${theme}; path=/; expires=${expiration}`
    }
}
