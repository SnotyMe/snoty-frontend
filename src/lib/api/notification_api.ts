import { type ApiProps, type ErrorJson, isErrorJson } from "./api";
import { authenticatedApiFetch, json_or_error } from "$lib/api/api";
import type { Notification, NotificationAttributes } from "$lib/model/notification";

export async function getNotificationCount(props: ApiProps): Promise<number | ErrorJson> {
    return authenticatedApiFetch(props, "notification/count")
        .then(r => {
            if (r.ok) {
                return r.text();
            }

            return json_or_error(r)
        })
}

export async function getNotifications(props: ApiProps): Promise<Notification[] | ErrorJson> {
    return authenticatedApiFetch(props, "notification/list")
        .then(json_or_error)
        .then(e => {
            if (isErrorJson(e)) return e;

            const notifications = e as ReplaceDateWithString<Notification>[];

            return notifications.map((notification) => ({
                ...notification,
                resolvedAt: notification.resolvedAt ? new Date(notification.resolvedAt) : null,
                lastSeenAt: new Date(notification.lastSeenAt),
            }));
        });
}

export function resolveNotification(props: ApiProps, attributes: NotificationAttributes): Promise<Response> {
    return authenticatedApiFetch(props, `notification/resolve`, {
        method: "PUT",
        body: JSON.stringify(attributes)
    });
}