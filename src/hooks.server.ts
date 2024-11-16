import { handle as auth } from "./auth"
import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";

const theme: Handle = async ({ event, resolve }) => {
    const cookies = event.cookies
    let colorScheme = cookies.get("colorScheme") ?? null
    // colorScheme can only be one of "light" or "dark"
    if (colorScheme !== "light" && colorScheme !== "dark") {
        // default to "no colorScheme"
        colorScheme = null
    }
    event.locals.colorScheme = colorScheme

    let theme = cookies.get("theme") ?? "cerberus"
    event.locals.theme = theme

    return resolve(event, {
        transformPageChunk(input: { html: string; done: boolean }) {
            input.html = input.html.replace("[colorScheme]", colorScheme ?? "")
            input.html = input.html.replace("[theme]", theme)
            return input.html
        }
    })
}

export const handle = sequence(auth, theme)
