<script lang="ts">
	import { ui, defaultLang } from '@/i18n/ui.js'
	import { useTranslations } from '@/i18n/utils'
	import { inputBase } from '@/utils/inputs.js'
	import { textMd, textSm } from '@/utils/typo.js'
	import { buttonBase, buttonPrimary, buttonMd } from '@/utils/buttons.js'
	import { classList } from '@/client/directives/classList.js'
	import FormGroup from './smaller/FormGroup.svelte'
	import { onMount } from 'svelte/internal' // needs to be imported from svelte/internal for tests to work
	import { validateEmail } from '../helpers/validations'

	export let locale: keyof typeof ui = defaultLang
	type NewsletterFormError = { email?: string }
	type NewsletterFormState = 'initializing' | 'idle' | 'running' | 'error' | 'success'
	let state: NewsletterFormState
	let email = ''
	let errors: NewsletterFormError
	$: state = 'initializing'
	$: errors = {}
	const t = useTranslations(locale)

	const onSubmit = async () => {
		// TBD
	}

	const validate = () => {
		if (state === 'idle') return {}
		const formErrors: NewsletterFormError = {}
		formErrors.email = validateEmail(email, t)
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

	onMount(() => {
		state = 'idle'
	})
</script>

{#if state === 'initializing'}
	<!-- Newsletter form initializing -->
{:else}
	<form novalidate>
		<div use:classList={['w-[28rem]']}>
			<label for="email" use:classList={['text-primary-900', textSm, 'font-semibold']}
				>{@html t('newsletterform.email.label')}</label
			>
			<div class="grid grid-cols-[20rem_auto] grid-rows-[1fr_1fr] gap-2">
				<FormGroup error={errors?.email} success={''} className="row-span-2">
					<input
						on:change={updateValidation}
						name="email"
						type="email"
						bind:value={email}
						use:classList={[textMd, inputBase]}
						placeholder={t('newsletterform.email.placeholder')}
						disabled={state === 'running'}
					/>
				</FormGroup>
				<button
					type="button"
					on:click={validateAndSubmit}
					disabled={state === 'running'}
					use:classList={[buttonBase, buttonPrimary, buttonMd, 'row-span-1']}
				>
					{@html t('newsletterform.button')}
				</button>
			</div>
		</div>
	</form>
{/if}
