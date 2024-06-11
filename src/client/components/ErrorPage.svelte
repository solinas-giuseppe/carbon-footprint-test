<script lang="ts">
	import { displayLg, textLg } from '@/utils/typo.js'
	import { classList } from '@/client/directives/classList.js'
	import { ui, defaultLang } from '@/i18n/ui.js'
	import { useTranslations } from '@/i18n/utils.js'
	import { textMd, textSm } from '@/utils/typo.js'
	import { formGroup, inputBase } from '@/utils/inputs.js'
	import { buttonBase, buttonPrimary, buttonMd } from '@/utils/buttons.js'

	export let locale: keyof typeof ui = defaultLang
	export let website: string | undefined
	export let resultUrl: string
	const t = useTranslations(locale)
</script>

<div class="flex max-w-[640px] flex-col gap-3">
	<div class="flex flex-col gap-1">
		<h1 use:classList={[displayLg, 'font-bolder']}>{@html t('pages.error.title')}</h1>
		<p use:classList={[textLg, 'font-medium']}>{@html t('pages.error.content', { website })}</p>
	</div>
	<form action={resultUrl || ''} method="GET">
		<div use:classList={[formGroup, 'w-[28rem]']}>
			<label for="site" use:classList={['text-primary-900', textSm, 'font-semibold']}>
				{@html t('websiteform.website.label')}
			</label>
			<div class="grid grid-cols-[20rem_auto] gap-2">
				<input
					required
					name="site"
					use:classList={[textMd, inputBase]}
					placeholder={t('websiteform.website.placeholder')}
				/>
				<button use:classList={[buttonBase, buttonPrimary, buttonMd]}>
					{@html t('websiteform.button')}
				</button>
			</div>
		</div>
	</form>
</div>
