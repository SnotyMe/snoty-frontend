import { PUBLIC_API_HOST } from "$env/static/public";
import { env } from "$env/dynamic/public"

export type Fetch = typeof fetch;

export const API_URL = env.PUBLIC_API_HOST ?? PUBLIC_API_HOST;

export async function apiFetch(props: UnauthenticatedApiProps, url: string, options: RequestInit = {}): Promise<Response> {
    options.headers = {
        ...options.headers,
        "Content-Type": "application/json"
    };
    try {
        return await props.fetch(`${API_URL}/${url}`, options);
    } catch (e) {
        // thank you javascript... welp CONNREFUSED is not an HTTP response but a network error that is thrown by fetch
        console.error(`Couldn't reach API endpoint ${url}:`, e);
        return new Response(JSON.stringify({ code: 599, message: `Couldn't reach API: ${e}` }), {
            status: 599,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export async function authenticatedApiFetch(props: ApiProps, url: string, options: RequestInit = {}): Promise<Response> {
    return apiFetch(props, url, injectAuth(props, options));
}

export function injectAuth(props: ApiProps, options: RequestInit = {}) {
    return {
        ...options,
        headers: {
            "Authorization": `Bearer ${props.token}`,
            ...options.headers,
        },
    };
}

export interface ErrorJson {
    error: boolean
    message: string
    code?: number
}

export function isErrorJson(obj: any): obj is ErrorJson {
    return obj && obj.error === true;
}

export async function json_or_error(res: Response): Promise<any> {
    if (res.ok) {
        return res.json();
    }

    const response = await res.text();
    try {
        const json = JSON.parse(response);
        return error_json(json);
    } catch (e) {
        return error_json({
            code: res.status,
            message: response,
        });
    }
}

export function error_json(error: Omit<ErrorJson, "error">): ErrorJson {
    console.error("An error occurred!", error);
    return { error: true, ...error };
}

export interface ApiProps extends UnauthenticatedApiProps {
    token: string
}

export interface UnauthenticatedApiProps {
    fetch: Fetch
}
