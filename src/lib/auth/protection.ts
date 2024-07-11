import { redirect, type ServerLoadEvent } from "@sveltejs/kit";

export function ensureLoggedIn(event: ServerLoadEvent) {
    if (event.locals.user == null) {
        throw redirect(307, "/auth/login")
    }
}
