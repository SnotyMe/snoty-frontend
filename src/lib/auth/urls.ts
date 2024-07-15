import { PUBLIC_AUTH_HOST, PUBLIC_AUTH_REDIRECT_HOST } from "$env/static/public";

export function buildAuthUrl(parts: string[]) {
    return PUBLIC_AUTH_HOST + parts.join("")
}

export const redirectUrl = `${PUBLIC_AUTH_REDIRECT_HOST}/auth/callback`
