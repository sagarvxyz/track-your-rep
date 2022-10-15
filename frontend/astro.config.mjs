import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [],
	site: 'https://www.trackyourrep.org',
	server: { port: 8080 },
});
