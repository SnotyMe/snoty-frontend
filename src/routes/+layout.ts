import type { LayoutServerLoad } from "./$types";
import { browser } from "$app/environment";

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
    if (!browser) return;

    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    if (locals?.colorScheme !== theme) {
        const formData = new FormData();
        formData.append("theme", theme);
        await fetch("/?/setTheme", {
            method: "POST",
            body: formData
        })
    }
}
