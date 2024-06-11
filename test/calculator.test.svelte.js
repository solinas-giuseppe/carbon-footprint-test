import { render, waitFor, cleanup } from '@testing-library/svelte'
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest'
import Calculator from '../src/client/components/Calculator.svelte'
import { defaultLang as locale } from '../src/i18n/ui'
import { useTranslations } from '../src/i18n/utils'
import { storagePrefix } from '@/client/helpers/constants'
import { stripTags } from '@/utils/string'

const t = useTranslations(locale)

// Mock data to return from the API
const mockData = {
	url: 'https://www.google.com/',
	green: true,
	bytes: 1014279,
	cleanerThan: 0.77,
	rating: 'B',
	statistics: {
		adjustedBytes: 765780.645,
		energy: 0.0005776829295326025,
		co2: {
			grid: { grams: 0.2553358548534103, litres: 0.1420178024694668 },
			renewable: { grams: 0.2213680985968933, litres: 0.12312493643959203 }
		}
	},
	timestamp: 1717595201
}
import.meta.env.DEFAULT_TIMESTAMP = '1718109815628'

const expectedParsedData = {
	cleanerThan: 0.77,
	green: true,
	bytes: 1014279,
	grams: 0.26,
	energy: 0.001,
	timestamp: parseInt(import.meta.env.DEFAULT_TIMESTAMP)
}

// Mock fetch
global.fetch = vi.fn()

const website = 'www.google.com'
const prefix = storagePrefix
describe('Calculator with correct params', () => {
	beforeEach(() => {
		global.fetch.mockClear()
		global.fetch.mockResolvedValue({
			json: vi.fn().mockResolvedValue(mockData)
		})

		afterEach(() => {
			cleanup()
		})
		// Mock URL parameters
		Object.defineProperty(window, 'location', {
			value: {
				search: `?site=${website}`,
				origin: 'http://localhost'
			},
			writable: true
		})
		vi.stubGlobal('sessionStorage', {
			setItem: vi.fn(),
			getItem: vi.fn(),
			removeItem: vi.fn(),
			clear: vi.fn()
		})
	})

	afterEach(() => {
		cleanup()
	})

	it('renders loading state initially', async () => {
		const { getByText, container } = render(Calculator, {
			locale: 'en',
			newTestUrl: '/new-test',
			resultUrl: '/result'
		})

		const text = t('calculator.title', { website })

		expect(getByText((_, element) => element.textContent === stripTags(text))).toBeTruthy()
		expect(container.querySelector('.animate-pulse')).toBeTruthy()
	})

	it('fetches carbon data and updates the state to success', async () => {
		const { findByText, container } = render(Calculator, {
			locale: 'en',
			newTestUrl: '/new-test',
			resultUrl: '/result'
		})

		await waitFor(() => {
			const expectedUrl = new URL('/api/carbon-api/', 'http://localhost')
			expectedUrl.searchParams.set('site', 'https://' + website)

			expect(global.fetch).toHaveBeenCalledWith(expectedUrl)
		})

		await waitFor(() => {
			expect(findByText(t('calculator.title', { website }))).toBeTruthy()
			expect(container.querySelector('.animate-pulse')).toBeFalsy()
		})
	})

	it('saves a key to session storage', async () => {
		render(Calculator, {
			locale: 'en',
			newTestUrl: '/new-test',
			resultUrl: '/result'
		})

		await waitFor(() => {
			// Assuming your component saves 'carbonData' to session storage
			expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
				prefix + website,
				JSON.stringify(expectedParsedData)
			)
		})
	})
})
