import { PUBLIC_API_HOST } from "$env/static/public";

export type Fetch = typeof fetch;

export async function authenticatedApiFetch(props: ApiProps, url: string, options: RequestInit = {}): Promise<Response> {
    options.headers = {
        ...options.headers,
        "Authorization": `Bearer ${props.token}`,
        "Content-Type": "application/json"
    };
    return await props.fetch(`${PUBLIC_API_HOST}/${url}`, options);
}

export interface ErrorJson {
    error: boolean
    message: string
}

export function error_json(error: any): ErrorJson {
    console.error("An error occurred!", error)
    return { error: true, message: error.message };
}

export interface ApiProps {
    token: string
    fetch: Fetch
}
