import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import { expect, test } from 'vitest'
import Header from '../src/components/layouts/base/Header.astro'

test('Header renders in the default locale with no props', async () => {
	const container = await AstroContainer.create()
	const result = await container.renderToString(Header)

	expect(result).toContain('Features')
	expect(result).toContain('Pricing')
	expect(result).toContain('About us')
})

test('Header supports alternate locale', async () => {
	const container = await AstroContainer.create()
	const result = await container.renderToString(Header, {
		props: {
			locale: 'it'
		}
	})

	expect(result).toContain('Caratteristiche')
	expect(result).toContain('Prezzi')
	expect(result).toContain('Chi siamo')
})
