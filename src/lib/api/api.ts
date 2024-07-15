import { PUBLIC_API_HOST } from "$env/static/public";

export type Fetch = typeof fetch;

export function authenticatedApiFetch(token: string, url: string, fetch: Fetch, options: RequestInit = {}): Promise<Response> {
    options.headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`
    };
    return fetch(`${PUBLIC_API_HOST}/${url}`, options)
}

export function error_json(error: any) {
    return { error: true, message: error.message };
}
