import type { NodeMetadata, SettinglessNode } from "$lib/model/nodes";

export type FullNode = SettinglessNode & {
    metadata: NodeMetadata
}
