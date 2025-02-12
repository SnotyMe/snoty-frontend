<script>
    import IconLogOut from "lucide-svelte/icons/log-out"

    function logout() {
        fetch('/auth/logout', {
            method: 'POST',
        }).then(() => window.location.reload());
    }
</script>

<style>
</style>

<div id="usermenu" class="flex flex-col divide-y-2 divide-surface-400">
    <button type="button" class="btn preset-filled-surface-100-900" onclick={logout}>
        Logout<IconLogOut/>
    </button>
</div>
