import type { PageServerLoad } from "./$types";
import { ensureLoggedIn } from "$lib/auth/protection";
import { getFlow } from "$lib/api/flow_api";

export const load: PageServerLoad = async ({ locals, params }) => {
    const token = ensureLoggedIn(locals);

    return {
        flow: await getFlow({ fetch, token }, params.id),
        colorScheme: locals.colorScheme,
    };
}
