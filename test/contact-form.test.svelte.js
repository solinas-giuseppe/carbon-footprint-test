import { render, fireEvent, waitFor, cleanup } from '@testing-library/svelte'
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest'

import ContactForm from '@/client/components/ContactForm.svelte'
import { defaultLang as locale } from '@/i18n/ui'
import { useTranslations } from '@/i18n/utils'

const t = useTranslations(locale)

// Mock fetch
global.fetch = vi.fn()

describe('ContactForm Component', () => {
	beforeEach(() => {
		global.fetch.mockClear()
		global.fetch.mockResolvedValue({
			ok: true,
			json: vi.fn().mockResolvedValue({ success: true })
		})
	})

	afterEach(() => {
		cleanup()
	})

	it('renders the form correctly', () => {
		const { getByPlaceholderText } = render(ContactForm, { locale: 'en' })

		expect(getByPlaceholderText(t('contactform.name.placeholder'))).toBeTruthy()
		expect(getByPlaceholderText(t('contactform.email.placeholder'))).toBeTruthy()
		expect(getByPlaceholderText(t('contactform.message.placeholder'))).toBeTruthy()
	})

	it('validates and submits the form successfully', async () => {
		const { findByText, container } = render(ContactForm, { locale: 'en' })

		const nameInput = container.querySelector('[name="name"]')
		const emailInput = container.querySelector('[name="email"]')
		const messageInput = container.querySelector('[name="message"]')
		const submitButton = container.querySelector('button[type="button"]')

		await fireEvent.input(nameInput, { target: { value: 'John Doe' } })
		await fireEvent.input(emailInput, { target: { value: 'john.doe@example.com' } })
		await fireEvent.input(messageInput, { target: { value: 'Hello, this is a message.' } })

		await fireEvent.click(submitButton)

		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith('/api/contact', expect.any(Object))
		})

		expect(findByText('Message sent')).toBeTruthy()
	})

	it('displays error messages when fields are empty', async () => {
		const { findByText, container } = render(ContactForm, { locale: 'en' })

		const submitButton = container.querySelector('button[type="button"]')

		await fireEvent.click(submitButton)

		await waitFor(() => {
			expect(findByText(t('contactform.errors.name_empty'))).toBeTruthy()
			expect(findByText(t('contactform.errors.email_empty'))).toBeTruthy()
			expect(findByText(t('contactform.errors.message_empty'))).toBeTruthy()
		})
	})

	it('displays an error message for invalid email', async () => {
		const { findByText, container } = render(ContactForm, { locale: 'en' })

		const emailInput = container.querySelector('[name="email"]')
		const submitButton = container.querySelector('button[type="button"]')

		await fireEvent.input(emailInput, { target: { value: 'invalid-email' } })
		await fireEvent.click(submitButton)

		await waitFor(() => {
			expect(findByText(t('contactform.errors.email_invalid'))).toBeTruthy()
		})
	})
})
