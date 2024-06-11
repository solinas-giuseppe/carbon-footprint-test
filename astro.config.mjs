import { defineConfig } from 'astro/config'
import aws from 'astro-sst'
import tailwind from '@astrojs/tailwind'
import svelte from '@astrojs/svelte'
import mdx from '@astrojs/mdx'
// import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
	output: 'hybrid',
	site: 'https://d1cpprd0gpbcge.cloudfront.net',
	integrations: [tailwind(), svelte(), mdx()],
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'it'],
		routing: {
			prefixDefaultLocale: true,
			redirectToDefaultLocale: true
		}
	},
	adapter: aws()
	// adapter: node({
	//    mode: "standalone"
	//  })
})

import { defineConfig } from 'astro/config'
