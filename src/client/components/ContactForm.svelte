<script lang="ts">
	import { ui, defaultLang } from '@/i18n/ui.js'
	import { useTranslations } from '@/i18n/utils'
	import { inputBase } from '@/utils/inputs.js'
	import { textMd, textSm } from '@/utils/typo.js'
	import { buttonBase, buttonPrimary, buttonMd } from '@/utils/buttons.js'
	import { classList } from '@/client/directives/classList.js'
	import FormGroup from './smaller/FormGroup.svelte'
	import FormMessage from '@/client/components/smaller/FormMessage.svelte'

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	export let locale: keyof typeof ui = defaultLang
	type ContactFormError = { name?: string; email?: string; message?: string }
	type ContactFormState = 'idle' | 'running' | 'error' | 'success'
	let formElement: HTMLFormElement
	let state: ContactFormState
	let name = ''
	let email = ''
	let message = ''
	let errors: ContactFormError
	$: state = 'idle'
	$: errors = {}
	const t = useTranslations(locale)
	const url = '/api/contact'

	const onSubmit = async () => {
		const formData = new FormData(formElement)

		try {
			const response = await fetch(url, {
				method: 'POST',
				body: formData
			})

			if (response.ok) {
				const result = await response.json()
				state = 'success'
			} else {
				console.error('Error:', response.statusText)
				state = 'error'
			}
		} catch (error) {
			console.error('Fetch error:', error)
		}
	}

	const validateEmail = () => {
		if (!email) {
			return t('contactform.errors.email_empty')
		}
		if (!emailRegex.test(email)) {
			return t('contactform.errors.email_invalid')
		}
	}
	const validate = () => {
		if (state === 'idle') return {}
		const formErrors: ContactFormError = {}
		formErrors.name = !name ? t('contactform.errors.name_empty') : ''
		formErrors.email = validateEmail()
		formErrors.message = !message ? t('contactform.errors.message_empty') : ''
		return formErrors
	}

	const updateValidation = () => {
		errors = validate()
	}

	const validateAndSubmit = () => {
		state = 'running'
		updateValidation()
		if (!Object.values(errors).filter(Boolean).length) {
			onSubmit()
		}
		state = 'error'
	}
</script>

{#if state === 'success'}
	<FormMessage type="success">Message sent</FormMessage>
{:else}
	<form bind:this={formElement} method="POST" class="flex w-[20rem] flex-col gap-3" novalidate>
		<div>
			<FormGroup error={errors?.name} success={''}>
				<label for="name" use:classList={['text-primary-900', textSm, 'font-semibold']}>
					{@html t('contactform.name.label')}
				</label>
				<input
					on:change={updateValidation}
					disabled={state === 'running'}
					name="name"
					bind:value={name}
					type="text"
					use:classList={[textMd, inputBase, 'mb-1']}
					placeholder={t('contactform.name.placeholder')}
				/>
			</FormGroup>
			<FormGroup error={errors?.email} success={''}>
				<label for="email" use:classList={['text-primary-900', textSm, 'font-semibold']}>
					{@html t('contactform.email.label')}
				</label>
				<input
					on:change={updateValidation}
					disabled={state === 'running'}
					name="email"
					bind:value={email}
					type="email"
					use:classList={[textMd, inputBase, 'mb-1']}
					placeholder={t('contactform.email.placeholder')}
				/>
			</FormGroup>

			<FormGroup error={errors?.message} success={''}>
				<label for="message" use:classList={['text-primary-900', textSm, 'font-semibold']}>
					{@html t('contactform.message.label')}
				</label>
				<textarea
					on:change={updateValidation}
					required
					disabled={state === 'running'}
					rows="5"
					name="message"
					bind:value={message}
					use:classList={[textMd, inputBase, 'mb-1']}
					placeholder={t('contactform.message.placeholder')}
				></textarea>
			</FormGroup>
		</div>
		<div>
			<button
				type="button"
				on:click={validateAndSubmit}
				disabled={state === 'running'}
				use:classList={[buttonBase, buttonPrimary, buttonMd]}
			>
				{@html t('contactform.button')}
			</button>
		</div>
	</form>
{/if}
