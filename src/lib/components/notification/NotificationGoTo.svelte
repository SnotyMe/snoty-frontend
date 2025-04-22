<script lang="ts">
    import { Popover } from "@skeletonlabs/skeleton-svelte";
    import IconLink from "lucide-svelte/icons/external-link";
    import type { NotificationAttributes } from "$lib/model/notification";

    interface Props {
        attributes: NotificationAttributes;
    }
    const { attributes }: Props = $props();

    interface AttributeLinks {
        [key: string]: {
            getUrl: (value: string) => string;
            getLabel: (value: string) => string;
        };
    }

    const attributeLinks: AttributeLinks = {
        "flow.id": {
            getUrl: (id: string) => `/flow/${id}`,
            getLabel: (_: string) => `Flow`,
        },
    };

    let open = $state(false);
</script>

<Popover
    {open}
    onOpenChange={e => (open = e.open)}
    positioning={{placement: "bottom"}}
    contentBase="card bg-surface-200-800 p-2 space-y-4 max-w-[320px]"
    classes="flex items-center"
    arrow
    arrowBackground="!bg-surface-200 dark:!bg-surface-800"
>
    {#snippet trigger()}<IconLink/>{/snippet}
    {#snippet content()}
        {#each Object.entries(attributes) as [key, value]}
            {@const link = attributeLinks[key]}
            {#if link}
                <a href={link.getUrl(value)} class="anchor">
                    {link.getLabel(value)}
                </a>
            {/if}
        {/each}
    {/snippet}
</Popover>
