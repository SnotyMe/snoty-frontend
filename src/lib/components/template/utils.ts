import { getNodeAPI as nodeAPIGetter } from "$lib/components/template/node";

export function copyToClipboard(text: string) {
    void navigator.clipboard.writeText(text);
}

export function getInputValue(id: string): string {
    return (document.getElementById(id) as HTMLInputElement).value;
}

export const getNodeAPI = nodeAPIGetter
