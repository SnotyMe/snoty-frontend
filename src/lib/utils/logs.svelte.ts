import type { NodeLogEntry } from "$lib/model/node_logs";

let allLogs: NodeLogEntry[] | null = $state([]);

export function getAllLogs() {
    function setLogs(logs: NodeLogEntry[]) {
        allLogs = logs;
    }

    return {
        get logs() {
            return allLogs;
        },
        setLogs
    };
}
