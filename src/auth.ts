import type { Handle } from "@sveltejs/kit";
import { refreshToken, shouldRefreshToken } from "$lib/auth/refresh";
import { parseToken } from "$lib/auth/parse";

export const handle: Handle = async ({ event, resolve }) => {
    let accessToken = event.cookies.get("access_token");
    if (accessToken != undefined) {
        const parsed = parseToken(accessToken);
        event.locals.user = parsed.user
        event.locals.access_token = accessToken;

        if (shouldRefreshToken(parsed)) {
            refreshToken(event.cookies.get("refresh_token")!);
        }
    }

    return resolve(event);
}
