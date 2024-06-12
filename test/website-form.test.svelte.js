import { render, fireEvent, waitFor, cleanup } from '@testing-library/svelte'
import { describe, afterEach, it, expect, vi } from 'vitest'

import WebsiteForm from '@/client/components/WebsiteForm.svelte'
import { defaultLang as locale } from '@/i18n/ui'
import { useTranslations } from '@/i18n/utils'

const t = useTranslations(locale)

describe('WebsiteForm Component', () => {
	afterEach(() => {
		cleanup()
	})

	it('renders the form correctly', () => {
		const { getByPlaceholderText, getByText } = render(WebsiteForm, {
			locale: 'en',
			action: '/result'
		})

		expect(getByPlaceholderText(t('websiteform.website.placeholder'))).toBeTruthy()
		expect(getByText(t('websiteform.button'))).toBeTruthy()
	})

	it('validates and submits the form successfully', async () => {
		// Mock window.location.href
		Object.defineProperty(window, 'location', {
			value: {
				href: '',
				origin: 'http://localhost'
			},
			writable: true
		})

		const { container } = render(WebsiteForm, { locale: 'en', action: '/result' })

		const siteInput = container.querySelector('[name="site"]')
		const submitButton = container.querySelector('button[type="button"]')

		await fireEvent.input(siteInput, { target: { value: 'example.com' } })
		await fireEvent.click(submitButton)

		await waitFor(() => {
			expect(window.location.href).toBe('http://localhost/result?site=example.com')
		})
	})

	it('displays error message when the site field is empty', async () => {
		const { findByText, container } = render(WebsiteForm, { locale: 'en', action: '/result' })

		const websiteInput = container.querySelector('[name="site"]')
		const submitButton = container.querySelector('button[type="button"]')

		await fireEvent.click(submitButton)

		await waitFor(() => {
			expect(findByText(t('websiteform.errors.site.empty'))).toBeTruthy()
			expect(websiteInput.validity.valid).toBe(false)
		})
	})
})
