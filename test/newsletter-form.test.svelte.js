import { render, fireEvent, waitFor, cleanup } from '@testing-library/svelte'
import { describe, beforeEach, afterEach, it, expect } from 'vitest'

import NewsletterForm from '@/client/components/NewsletterForm.svelte'
import { defaultLang as locale } from '@/i18n/ui'
import { useTranslations } from '@/i18n/utils'

const t = useTranslations(locale)

describe('NewsletterForm Component', () => {
	beforeEach(() => {
		cleanup()
	})

	afterEach(() => {
		cleanup()
	})

	it('renders the form correctly', () => {
		const { getByPlaceholderText, getByText } = render(NewsletterForm, { locale: 'en' })

		expect(getByPlaceholderText(t('newsletterform.email.placeholder'))).toBeTruthy()
		expect(getByText(t('newsletterform.button'))).toBeTruthy()
	})

	it('validates and submits the form successfully', async () => {
		const { container } = render(NewsletterForm, { locale: 'en' })

		const emailInput = container.querySelector('[name="email"]')
		const submitButton = container.querySelector('button[type="button"]')

		await fireEvent.input(emailInput, { target: { value: 'test@example.com' } })
		await fireEvent.click(submitButton)

		await waitFor(() => {
			expect(emailInput.value).toBe('test@example.com')
			expect(emailInput.checkValidity()).toBe(true)
		})
	})

	it('displays error message and invalid state when the email field is empty', async () => {
		const { findByText, container } = render(NewsletterForm, { locale: 'en' })

		const emailInput = container.querySelector('[name="email"]')
		const submitButton = container.querySelector('button[type="button"]')

		await fireEvent.click(submitButton)

		await waitFor(() => {
			expect(findByText(t('form.errors.email_empty'))).toBeTruthy()
			expect(emailInput.validity.valid).toBe(false)
		})
	})

	it('displays error message and invalid state for an invalid email', async () => {
		const { findByText, container } = render(NewsletterForm, { locale: 'en' })

		const emailInput = container.querySelector('[name="email"]')
		const submitButton = container.querySelector('button[type="button"]')

		await fireEvent.input(emailInput, { target: { value: 'invalid-email' } })
		await fireEvent.click(submitButton)

		await waitFor(() => {
			expect(findByText(t('form.errors.email_invalid'))).toBeTruthy()
			expect(emailInput.validity.valid).toBe(false)
		})
	})
})
