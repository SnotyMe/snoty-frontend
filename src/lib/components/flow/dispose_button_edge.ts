export type OnDisconnectEvent = CustomEvent<{
    source: string
    target: string
}>

export interface DisposeButtonEdgeData {
    ondisconnect: (event: OnDisconnectEvent) => Promise<void>
}
