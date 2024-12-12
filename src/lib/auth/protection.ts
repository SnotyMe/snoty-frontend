import { redirect } from "@sveltejs/kit";

export function ensureLoggedIn(locals: App.Locals): string {
    if (locals.user == null) {
        throw redirect(307, "/auth/login");
    }
    // user exists => token can't be null
    return locals.access_token!!;
}
