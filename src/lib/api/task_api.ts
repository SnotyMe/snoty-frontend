import { type ApiProps, authenticatedApiFetch } from "$lib/api/api";

interface Task {
    displayName: string
    name: string
}

export async function getTasks(apiProps: ApiProps): Promise<Task[]> {
    return authenticatedApiFetch(apiProps, "task/list")
        .then(res => res.json());
}

export async function triggerTask(apiProps: ApiProps, taskName: string): Promise<Response> {
    return authenticatedApiFetch(apiProps, `task/trigger?action=${taskName}`, {
        method: "POST"
    });
}
