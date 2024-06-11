// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
	plugins: ['prettier-plugin-astro', 'prettier-plugin-svelte'],
	trailingComma: 'all',
	semi: true,
	singleQuote: false,
	arrowParens: 'avoid',
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro'
			}
		},
		{
			files: '*.svelte',
			options: {
				parser: 'svelte'
			}
		}
	]
}
