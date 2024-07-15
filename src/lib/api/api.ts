import { PUBLIC_API_HOST } from "$env/static/public";

export type Fetch = typeof fetch;

export async function authenticatedApiFetch(props: ApiProps, url: string, options: RequestInit = {}): Promise<Response> {
    options.headers = {
        ...options.headers,
        "Authorization": `Bearer ${props.token}`
    };
    const res = await props.fetch(`${PUBLIC_API_HOST}/${url}`, options);
    if (!res.ok) {
        throw new Error(res.statusText);
    }
    return res;
}

export function error_json(error: any) {
    return { error: true, message: error.message };
}

export interface ApiProps {
    token: string
    fetch: Fetch
}
