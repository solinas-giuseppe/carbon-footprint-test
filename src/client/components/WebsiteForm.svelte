<script lang="ts">
	import { ui, defaultLang } from '@/i18n/ui.js'
	import { useTranslations } from '@/i18n/utils'
	import { inputBase } from '@/utils/inputs.js'
	import { textMd, textSm } from '@/utils/typo.js'
	import { buttonBase, buttonPrimary, buttonMd } from '@/utils/buttons.js'
	import { classList } from '@/client/directives/classList.js'
	import FormGroup from './smaller/FormGroup.svelte'
	import { onMount } from 'svelte/internal' // needs to be imported from svelte/internal for tests to work

	export let locale: keyof typeof ui = defaultLang
	export let action: string
	type WebsiteFormError = { site?: string }
	type WebsiteFormState = 'initializing' | 'idle' | 'running' | 'error' | 'success'
	let state: WebsiteFormState
	let site = ''
	let errors: WebsiteFormError
	$: state = 'initializing'
	$: errors = {}
	const t = useTranslations(locale)

	const onSubmit = async () => {
		const url = new URL(action, window.location.origin)
		url.searchParams.set('site', site)
		window.location.href = url.toString()
	}

	const validate = () => {
		if (state === 'idle') return {}
		const formErrors: WebsiteFormError = {}
		formErrors.site = !site ? t('websiteform.errors.site.empty') : ''
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
	<!-- Website form initializing -->
{:else}
	<form {action} novalidate>
		<div use:classList={['w-[28rem]']}>
			<label for="site" use:classList={['text-primary-900', textSm, 'font-semibold']}>
				{@html t('websiteform.website.label')}
			</label>
			<div class="grid grid-cols-[20rem_auto] grid-rows-[1fr_1fr] gap-2">
				<FormGroup error={errors?.site} success={''} class="row-span-2">
					<input
						on:change={updateValidation}
						name="site"
						type="text"
						bind:value={site}
						use:classList={[textMd, inputBase]}
						placeholder={t('websiteform.website.placeholder')}
						disabled={state === 'running'}
					/>
				</FormGroup>
				<button
					type="button"
					on:click={validateAndSubmit}
					disabled={state === 'running'}
					use:classList={[buttonBase, buttonPrimary, buttonMd, 'row-span-1']}
				>
					{@html t('websiteform.button')}
				</button>
			</div>
		</div>
	</form>
{/if}
