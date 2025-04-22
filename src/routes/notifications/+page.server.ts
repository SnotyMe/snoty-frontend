import type { PageServerLoad } from "./$types";
import { type ApiProps, type ErrorJson } from "$lib/api/api";
import { ensureLoggedIn } from "$lib/auth/protection";
import { getNotifications } from "$lib/api/notification_api";
import { type Notification } from "$lib/model/notification";

export const load: PageServerLoad = async ({ locals, fetch }): Promise<{
    notifications: Promise<Notification[] | ErrorJson>,
} & App.Locals> => {
    const token = ensureLoggedIn(locals);
    const apiProps: ApiProps = { token, fetch };

    return {
        ...locals,
        notifications: getNotifications(apiProps)
    };
}
