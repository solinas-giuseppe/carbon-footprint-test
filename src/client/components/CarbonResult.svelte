<script lang="ts">
	import { classList } from '@/client/directives/classList.js'
	import type { CarbonObject } from '@/client/helpers/props.js'
	import CircleProgress from './smaller/CircleProgress.svelte'
	import { ui, defaultLang } from '@/i18n/ui.js'
	import { useTranslations } from '@/i18n/utils.js'
	import { displayLg, displayMd, displayXs, textLg } from '@/utils/typo.js'
	import ResultDetail from '@/client/components/smaller/ResultDetail.svelte'

	export let locale: keyof typeof ui = defaultLang
	export let animated: boolean = false
	export let website: string
	export let state: 'loading' | 'success'
	export let carbonResult: CarbonObject | undefined
	$: state
	$: ({ cleanerThan, green, bytes, grams, energy } = carbonResult || {
		cleanerThan,
		green,
		bytes,
		grams,
		energy
	})

	const t = useTranslations(locale)
	$: percentage = cleanerThan * 100

	const getGreenLabel = (g) => {
		switch (g) {
			case true:
				return t('utils.yes')
			case false:
				return t('utils.no')
			case 'unknown':
				return t('utils.unknown')
		}
	}
	const cardIndex = 0
	const thresholds = {
		bytes: parseFloat(import.meta.env.PUBLIC_BYTES_THRESHOLD),
		grams: parseFloat(import.meta.env.PUBLIC_GRAMS_THRESHOLD),
		energy: parseFloat(import.meta.env.PUBLIC_ENERGY_THRESHOLD)
	}
</script>

<div class="grid grid-cols-4 gap-3">
	<div
		use:classList={[
			'grid',
			'grid-cols-[10rem_auto]',
			'gap-4',
			'col-span-4',
			'bg-secondary-100',
			'p-3',
			'rounded-12',
			'min-h-[13rem]'
		]}
		class:animate-pulse={state === 'loading'}
	>
		{#if cleanerThan !== undefined}
			<CircleProgress {animated} {percentage} />
			<div class="flex flex-col gap-1">
				<h2 use:classList={[displayMd, 'font-bolder', 'text-primary-600']}>
					{@html t('result.title')}
				</h2>
				<p use:classList={[displayXs, 'font-bolder', 'text-primary-900']}>
					{@html t('result.content', { website, percentage })}
				</p>
			</div>
		{/if}
	</div>
	{#if green !== undefined || state === 'loading'}
		<ResultDetail
			title={t('result.green-server.title')}
			content={t('result.green-server.content')}
			theme={green ? 'success' : 'warning'}
			index={cardIndex + 1}
			cardClass="min-h-[252px]"
			{state}
			{animated}
		>
			<span use:classList={[displayLg, 'font-bolder']}>
				{@html getGreenLabel(green)}
			</span>
		</ResultDetail>
	{/if}
	{#if bytes !== undefined || state === 'loading'}
		<ResultDetail
			title={t('result.bytes.title')}
			content={t('result.bytes.content')}
			theme={bytes < thresholds.bytes ? 'success' : 'warning'}
			index={cardIndex + 2}
			cardClass="min-h-[252px]"
			{state}
			{animated}
		>
			<div>
				<span use:classList={[displayLg, 'font-bolder']}>
					{@html bytes}
				</span>
				<span use:classList={[textLg]}>{@html t('utils.per-page')}</span>
			</div>
		</ResultDetail>
	{/if}
	{#if grams !== undefined || state === 'loading'}
		<ResultDetail
			title={t('result.co2.title')}
			content={t('result.co2.content')}
			theme={grams < thresholds.grams ? 'success' : 'warning'}
			index={cardIndex + 3}
			cardClass="min-h-[252px]"
			{state}
			{animated}
		>
			<div>
				<span use:classList={[displayLg, 'font-bolder']}>
					{@html grams}g
				</span>
				<span use:classList={[textLg]}>{@html t('utils.per-page-load')}</span>
			</div>
		</ResultDetail>
	{/if}
	{#if energy !== undefined || state === 'loading'}
		<ResultDetail
			title={t('result.kw.title')}
			content={t('result.kw.content')}
			theme={energy < thresholds.energy ? 'success' : 'warning'}
			index={cardIndex + 4}
			cardClass="min-h-[252px]"
			{state}
			{animated}
		>
			<div>
				<span use:classList={[displayLg, 'font-bolder']}>
					{@html energy}
				</span>
				<span use:classList={[textLg]}>{@html t('utils.per-page-load')}</span>
			</div>
		</ResultDetail>
	{/if}
</div>
