import type { Handle } from "@sveltejs/kit";
import { refreshAccessToken, shouldRefreshToken } from "$lib/auth/refresh";
import { parseToken } from "$lib/auth/parse";
import { setAuthCookies } from "./routes/auth/callback/auth-cookies";

export const handle: Handle = async ({ event, resolve }) => {
    let accessToken = event.cookies.get("access_token");
    const refreshToken = event.cookies.get("refresh_token");

    let parsed = accessToken != undefined ? parseToken(accessToken) : undefined;
    if ((accessToken == undefined && refreshToken != undefined) || (parsed && shouldRefreshToken(parsed))) {
        const refreshed = await refreshAccessToken(event.fetch, refreshToken);

        // refresh may fail, no biggie
        if (refreshed != null) {
            event.locals.access_token = refreshed;
            setAuthCookies(event.url, refreshed, event.cookies);
            accessToken = refreshed.access_token;
            parsed = parseToken(refreshed.access_token);
        }
    }

    if (accessToken != null && parsed != undefined) {
        event.locals.user = parsed.user;
        event.locals.access_token = accessToken;
    }

    return resolve(event);
}
