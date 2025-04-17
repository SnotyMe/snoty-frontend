<script lang="ts">
    import { CronExpressionParser } from "cron-parser";
    import cronstrue from 'cronstrue/i18n';

    interface Props {
        expression: string
        onchange: (expression: string) => void
    }

    let {
        expression: initialExpression,
        onchange
    }: Props = $props();
    let value = $state(initialExpression);
    let expression = $derived(value.trim());
    function tryParse(expression: string) {
        try {
            CronExpressionParser.parse(expression);
            return true;
        } catch (error) {
            return false;
        }
    }
    let expressionParseSuccessful = $derived(tryParse(expression));

    let isExpressionValid = $derived(expression.split(" ").length == 5 && expressionParseSuccessful);

    function firstCharacterLowerCase(string: string) {
        return string.charAt(0).toLowerCase() + string.substring(1);
    }

    $effect(() => {
        if (isExpressionValid) onchange(expression);
    });
</script>

<div class="flex flex-row items-center justify-between">
    <input type="text" class="input w-min" placeholder="CRON Expression" bind:value/>
    {#if isExpressionValid}
        <p>Will run {firstCharacterLowerCase(cronstrue.toString(expression))}</p>
    {:else}
        <p class="text-red-500">Please enter a valid CRON expression.</p>
    {/if}
</div>
<p>Need help? Try using a website like <a class="anchor" href="https://crontab.guru" target="_blank">crontab.guru</a>!</p>
