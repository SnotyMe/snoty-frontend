import type { Snippet } from "svelte"

export interface NodePopupProps {
    defaultOpen?: boolean
    class?: string
    trigger: Snippet<[]>
    content: Snippet<[]>
    actions?: Snippet<[]>
}
