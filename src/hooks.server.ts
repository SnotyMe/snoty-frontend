import { handle as auth } from "./auth"
import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";

const theme: Handle = async ({ event, resolve }) => {
    const cookies = event.cookies
    let theme = cookies.get("theme") ?? null
    // theme can only be one of "light" or "dark"
    if (theme !== "light" && theme !== "dark") {
        // default to "no theme"
        theme = null
    }
    event.locals.colorScheme = theme

    return resolve(event, {
        transformPageChunk(input: { html: string; done: boolean }) {
            input.html = input.html.replace("[colorScheme]", theme ?? "")
            return input.html
        }
    })
}

export const handle = sequence(auth, theme)
