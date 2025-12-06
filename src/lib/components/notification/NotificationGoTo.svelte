<script lang="ts">
    import { Popover, Portal } from "@skeletonlabs/skeleton-svelte";
    import IconLink from "lucide-svelte/icons/external-link";
    import type { NotificationAttributes } from "$lib/model/notification";

    interface Props {
        attributes: NotificationAttributes;
    }
    const { attributes }: Props = $props();

    interface AttributeLinks {
        [key: string]: {
            getUrl: (value: string, attributes: NotificationAttributes) => string;
            getLabel: (value: string) => string;
        };
    }

    const attributeLinks: AttributeLinks = {
        "flow.id": {
            getUrl: (id: string) => `/flow/${id}`,
            getLabel: (_: string) => "Flow",
        },
        "node.id": {
            getUrl: (id: string, attributes: NotificationAttributes) => `/flow/${attributes["flow.id"]}?highlightedNode=${id}`,
            getLabel: (_: string) => "Node",
        }
    };

    let open = $state(false);
</script>

<Popover
    {open}
    onOpenChange={e => (open = e.open)}
    positioning={{placement: "bottom"}}
>
    <Popover.Trigger><IconLink/></Popover.Trigger>
    <Portal>
        <Popover.Positioner>
            <Popover.Content class="card bg-surface-200-800 max-w-[320px] flex flex-col gap-2 p-2 ring-2 shadow-secondary-950-50">
                {#each Object.entries(attributes) as [key, value]}
                    {@const link = attributeLinks[key]}
                    {#if link}
                        <a href={link.getUrl(value, attributes)} class="btn preset-filled">
                            <span>{link.getLabel(value)}</span>
                            <span>&rarr;</span>
                        </a>
                    {/if}
                {/each}
            </Popover.Content>
        </Popover.Positioner>
    </Portal>
</Popover>
