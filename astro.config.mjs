import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
	site: 'https://brandonmartin.dev',
	integrations: [
		react({ include: ['**/react/**'] }),
		svelte(),
		vue(),
		solid({ include: ['**/solid/**'] }),
		sitemap(),
	],
	output: 'server',
	adapter: netlify(),
});
