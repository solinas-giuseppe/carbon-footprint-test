import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, test } from 'vitest'
import Footer from '../src/components/layouts/base/Footer.astro'

test('Footer renders in the default locale with no props', async () => {
	const container = await AstroContainer.create()
	const result = await container.renderToString(Footer)

	expect(result).toContain('Contact us')
	expect(result).toContain('Privacy policy')
	expect(result).toContain('About us')
})

test('Footer supports alternate locale', async () => {
	const container = await AstroContainer.create()
	const result = await container.renderToString(Footer, {
		props: {
			locale: 'it'
		}
	})

	expect(result).toContain('Contatti')
	expect(result).toContain('Informativa sulla privacy')
	expect(result).toContain('Chi siamo')
})
