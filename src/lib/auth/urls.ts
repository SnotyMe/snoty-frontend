import { PUBLIC_AUTH_HOST, PUBLIC_APP_URL } from "$env/static/public";

export function buildAuthUrl(parts: string[]) {
    return PUBLIC_AUTH_HOST + parts.join("")
}

export const redirectUrl = `${PUBLIC_APP_URL}/auth/callback`
