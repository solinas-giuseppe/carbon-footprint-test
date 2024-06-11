import { render, waitFor, cleanup } from '@testing-library/svelte'
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest'
import PreviousCalculations from '../src/client/components/PreviousCalculations.svelte'
import { defaultLang as locale } from '../src/i18n/ui'
import { useTranslations } from '../src/i18n/utils'
import { storagePrefix } from '@/client/helpers/constants'
import { idAttribute } from '@/utils/string'

const t = useTranslations(locale)

const websiteOpen = 'www.italo.it'
const websiteClosed = 'www.google.com'
const websiteResults = {
	[websiteOpen]: {
		cleanerThan: 0.31,
		green: true,
		bytes: 3803775,
		grams: 0.96,
		energy: 0.002,
		timestamp: 1718109238
	},
	[websiteClosed]: {
		cleanerThan: 0.84,
		green: true,
		bytes: 771523,
		grams: 0.19,
		energy: 0,
		timestamp: 1718027499
	}
}

const prefix = storagePrefix

describe('PreviousCalculations with data', () => {
	beforeEach(() => {
		vi.stubGlobal('sessionStorage', {
			...Object.fromEntries(
				Object.entries(websiteResults).map(([website, result]) => [
					`${prefix}${website}`,
					JSON.stringify(result)
				])
			)
		})
	})

	afterEach(() => {
		cleanup()
	})
	it('presents a list of previous calculations', async () => {
		const { getByText, container } = render(PreviousCalculations, {
			locale: 'en'
		})

		// Wait for the component to be fully rendered
		await waitFor(() => {
			const text = t('results-list.title')
			expect(getByText(text)).toBeTruthy()
		})

		// Check that each website is present in the rendered output
		const websiteTitleOpen = t('results-list.item.title.open', { website: websiteOpen })
		const websiteTitleClosed = t('results-list.item.title.closed', { website: websiteClosed })
		expect(container.innerHTML).toContain(websiteTitleOpen)
		expect(container.innerHTML).toContain(websiteTitleClosed)
	})

	it('has one website result open and one closed', async () => {
		const { container } = render(PreviousCalculations, {
			locale: 'en'
		})

		// Wait for the component to be fully rendered
		await waitFor(() => {
			expect(container.querySelector(`[id="${idAttribute(websiteOpen)}"]`)).toBeVisible()
			expect(container.querySelector(`[id="${idAttribute(websiteClosed)}"]`)).not.toBeVisible()
		})
	})

	it('the user is able to expand/collapse result blocks', async () => {
		const { container, getByText } = render(PreviousCalculations, {
			locale: 'en'
		})
		let expandButton
		await waitFor(() => {
			expandButton = getByText(t('action.expand'))
			expandButton.click()
		})

		await waitFor(() => {
			expect(container.querySelector(`[id="${idAttribute(websiteClosed)}"]`)).toBeVisible()
			expect(container.querySelector(`[id="${idAttribute(websiteOpen)}"]`)).not.toBeVisible()
		})

		await waitFor(() => {
			expandButton.click()
		})

		await waitFor(() => {
			expect(container.querySelector(`[id="${idAttribute(websiteClosed)}"]`)).not.toBeVisible()
		})
	})
})

describe('PreviousCalculations without data', () => {
	beforeEach(() => {
		vi.stubGlobal('sessionStorage', {})
	})

	afterEach(() => {
		cleanup()
	})

	it('does not show the list or its title when there is no data', async () => {
		const { queryByText } = render(PreviousCalculations, {
			locale: 'en'
		})

		// Wait for the component to be fully rendered
		await waitFor(() => {
			const text = t('results-list.title')
			expect(queryByText(text)).not.toBeInTheDocument()
		})
	})
})
