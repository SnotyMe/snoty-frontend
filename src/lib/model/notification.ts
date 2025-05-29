export type NotificationAttributes = Record<string, string>;

export interface Notification {
    id: string;
    userId: string
    attributes: NotificationAttributes
    resolvedAt: Date | null
    lastSeenAt: Date
    count: number

    title: string
    description: string | null
}

