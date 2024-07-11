import type { PageServerLoad } from "./$types";
import { ensureLoggedIn } from "$lib/auth/protection";

export const load: PageServerLoad = async (event) => {
    ensureLoggedIn(event)
}
