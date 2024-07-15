import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
    const user = event.locals.user;

    return {
        user,
        access_token: event.locals.access_token
    }
}
