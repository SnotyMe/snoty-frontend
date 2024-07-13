<script>
    function logout() {
        fetch('/auth/logout', {
            method: 'POST',
        }).then(() => window.location.reload())
    }
</script>

<style>
    #usermenu {
        z-index: 9999;

        & > * {
            border-radius: 0;
        }

        & > *:first-child {
            border-top-left-radius: var(--radii-default);
            border-top-right-radius: var(--radii-default);
        }

        & > *:last-child {
            border-bottom-left-radius: var(--radii-default);
            border-bottom-right-radius: var(--radii-default);
        }

        border-radius: var(--radii-default);
        box-shadow: 0 0 0.75em 0 rgb(var(--color-surface-100) / 0.25);
    }
</style>

<div id="usermenu" class="absolute shadow-surface-100 flex flex-col divide-y-2 divide-surface-400 ml-52 bottom-4">
    <button type="button" class="btn preset-filled-surface-100-900" onclick={logout}>Logout</button>
</div>
