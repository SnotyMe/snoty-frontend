export interface PopupProps {
    isOpen: boolean
    class?: string
    // https://github.com/sveltejs/svelte/issues/15635
    innerClass: string | null
    verticalAlign?: "top" | "bottom"
    horizontalAlign: "left" | "right"
    width: string
    height: string
}
