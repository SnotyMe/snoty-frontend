import type { Snippet } from "svelte"
import { useDialog } from "@skeletonlabs/skeleton-svelte"

export interface NodePopupProps {
    defaultOpen?: boolean
    class?: string
    trigger: Snippet<[]>
    content: Snippet<[ReturnType<typeof useDialog>]>
    actions?: Snippet<[]>
}
