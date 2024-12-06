import { type ApiProps, authenticatedApiFetch } from "$lib/api/api";
import { getNodeAPI as nodeAPIGetter } from "$lib/components/template/node";

export class TemplateAPI {
    private readonly apiProps: ApiProps;

    constructor(apiProps: ApiProps) {
        this.apiProps = apiProps;
    }

    getNodeAPI = nodeAPIGetter

    copyToClipboard(text: string) {
        void navigator.clipboard.writeText(text);
    }

    getInputValue(id: string): string {
        return (document.getElementById(id) as HTMLInputElement).value;
    }

    authenticatedFetch(url: string, init: RequestInit): Promise<Response> {
        return this.apiProps.fetch(url, {
            ...init,
            headers: {
                "Authorization": `Bearer ${this.apiProps.token}`,
                ...init.headers,
            },
        })
    }

    backendFetch(url: string, init: RequestInit): Promise<Response> {
        return authenticatedApiFetch(this.apiProps, url, init)
    }
}
