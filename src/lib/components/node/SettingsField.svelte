<script lang="ts">

    interface Props {
        value: any
    }

    const { value }: Props = $props();
</script>

<style>
    input {
        background: none;
    }

    div, input {
        width: 100%;
    }
</style>

<div>
    <input type="text" value={value}/>
</div>
