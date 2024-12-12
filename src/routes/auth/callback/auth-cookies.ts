import { MAX_COOKIE_AGE } from "$lib/utils/cookie_utils";

export function setAuthCookies(url: URL, res: any, cookies: any) {
    const ops = {
        secure: url.protocol.includes("https"),
        expires: new Date(new Date().getTime() + res.expires_in * 1000),
        path: "/",
    };
    cookies.set("access_token", res.access_token, ops);
    cookies.set("refresh_token", res.refresh_token, { ...ops, maxAge: MAX_COOKIE_AGE });
    cookies.set("id_token", res.id_token, ops);
}
