import type { LayoutServerLoad } from "./$types";
import { getRoles } from "$lib/api/user_api";

export const load: LayoutServerLoad = async ({locals, fetch}) => {
    const user = locals.user;
    const colorScheme = locals.colorScheme;

    return {
        user,
        roles: locals.access_token != null ? await getRoles({
            token: locals.access_token,
            fetch: fetch
        }) : null,
        access_token: locals.access_token,
        colorScheme,
    }
}
