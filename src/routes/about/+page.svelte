<script>
    import Monitor from "lucide-svelte/icons/monitor";
    import Server from "lucide-svelte/icons/server";
    import Book from "lucide-svelte/icons/book-text";
</script>

<style>
    li > *:not(:first-child) {
        margin-left: 0.5em;
    }

    #wrapper > div {
        @apply space-y-2;
    }

    a { @apply anchor; }
    h1 { @apply h1; }
    h2 { @apply h2; }
    h3 { @apply h3; }

    #technology {
        & img {
            @apply w-8 h-8;
        }

        & > div {
            @apply flex justify-center gap-1;
        }
    }
</style>

<div id="wrapper" class="text-center space-y-8">
    <div>
        <h1>About</h1>
        <p>
            Snoty is a project by <a href="https://github.com/SIMULATAN">Jakob Hofer</a>
            and the <a href="https://aggregate-contributions.simulatan.me/?user=snotyme">Snoty Contributors</a>.
        </p>
        <p>
            Founded as a Diploma Thesis @ <a href="https://htl-leonding.at">HTL Leonding</a> in 2024.
        </p>
    </div>

    <div>
        <h2>Open Source</h2>
        <p>Snoty is Open Source and available on GitHub.</p>
        <ul class="list-inside space-y-2 mt-2">
            <li>
                <Monitor class="inline"/>
                <a href="https://github.com/SnotyMe/snoty-frontend">Frontend</a> (MIT)
            </li>
            <li>
                <Server class="inline"/>
                <a href="https://github.com/SnotyMe/snoty-backend">Backend</a> (GPL-3.0)
            </li>
            <li>
                <Book class="inline"/>
                <a href="https://github.com/SnotyMe/Thesis">Thesis</a>
            </li>
        </ul>
    </div>

    <div id="technology">
        <h2>Technologies</h2>

        <h3>Frontend</h3>
        <div>
            <img alt="svelte logo"
                 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg"/>
            <img alt="skeleton logo"
                src="/about/icons/Skeleton.svg"/>
            <img alt="tailwind logo"
                 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"/>
            <img alt="webstorm logo"
                 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webstorm/webstorm-original.svg"/>
        </div>

        <h3>Backend</h3>
        <div>
            <img alt="kotlin logo"
                 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg"/>
            <img alt="ktor logo"
                 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ktor/ktor-original.svg"/>
            <img alt="mongodb logo"
                 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"/>
            <img alt="opentelemetry logo"
                 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opentelemetry/opentelemetry-original.svg"/>
            <img alt="intellij logo"
                 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/intellij/intellij-original.svg"/>
        </div>
    </div>
</div>
