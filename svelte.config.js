import nodeAdapter from '@sveltejs/adapter-node';
import cloudflareAdapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	alias: {
		src: "src",
	},
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		// https://developers.cloudflare.com/pages/configuration/build-configuration/#environment-variables
		adapter: process.env.CF_PAGES === "1"
			? cloudflareAdapter()
			: nodeAdapter()
	},
	onwarn(warning, handler) {
		// svelteflow uses these self-closing `div` tags, we don't care though.
		if (warning.code === "element_invalid_self_closing_tag") return;
		handler(warning)
	},
};

process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at: ', promise, 'reason:', reason);
});

export default config;
