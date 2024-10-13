import { PUBLIC_API_HOST, PUBLIC_APP_URL } from "$env/static/public";
import { env } from "$env/dynamic/public";

export const config = {
    apiHost: env.PUBLIC_API_HOST ?? PUBLIC_API_HOST,
    appUrl: env.PUBLIC_APP_URL ?? PUBLIC_APP_URL,
}
