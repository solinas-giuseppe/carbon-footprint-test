/// <reference types="vitest" />
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
export default defineConfig({
	plugins: [svelte({ hot: true }), tsconfigPaths()],
	test: {
		setupFiles: './test/setup.js',
		environment: 'jsdom',
		include: ['**/*.{test.svelte,spec.svelte}.?(c|m)[jt]s?(x)']
		// Vitest configuration options
	}
})
