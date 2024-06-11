/// <reference types="vitest" />
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { getViteConfig } from 'astro/config'

export default getViteConfig({
	plugins: [svelte({ hot: true })],
	test: {
		include: ['**/*.{test.astro,spec.astro}.?(c|m)[jt]s?(x)']
		// Vitest configuration options
	}
})
