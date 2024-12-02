import { PUBLIC_AUTH_HOST, PUBLIC_APP_URL, PUBLIC_API_HOST } from "$env/static/public";
import { env } from '$env/dynamic/public';

export function buildAuthUrl(parts: string[]) {
    return (env.PUBLIC_AUTH_HOST ?? PUBLIC_AUTH_HOST) + parts.join("")
}

export function buildBackendUrl(parts: string[]) {
    return (env.PUBLIC_API_HOST ?? PUBLIC_API_HOST) + parts.join("")
}

export function redirectUrl(url: URL) {
    return (url ? (url.protocol + "//" + url.host) : env.PUBLIC_APP_URL ?? PUBLIC_APP_URL) + "/auth/callback"
}
