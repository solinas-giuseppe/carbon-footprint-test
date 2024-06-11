<script lang="ts">
	const url = '/api/carbon-api/'
	import { classList } from '@/client/directives/classList.js'
	import { ui, defaultLang } from '@/i18n/ui.js'
	import { useTranslations } from '@/i18n/utils.js'
	import { buttonBase, buttonTertiary, buttonLg } from '@/utils/buttons.js'
	import { displayMd } from '@/utils/typo.js'
	import ErrorPage from '@/client/components/ErrorPage.svelte'
	import CarbonResult from '@/client/components/CarbonResult.svelte'
	import { parseCarbonResult } from '@/client/helpers/utils'
	import { onMount } from 'svelte/internal'
	import type { CarbonObject } from '../helpers/props'
	import { resultCardClass } from '../helpers/result-card'
	import { storagePrefix } from '../helpers/constants'
	export let locale: keyof typeof ui = defaultLang
	export let newTestUrl: string
	export let resultUrl: string
	const prefix = storagePrefix
	let website: string | undefined
	let websiteUrl: string | undefined
	let state: 'loading' | 'success' | 'error'
	let carbonData: CarbonObject
	$: state = 'loading'
	$: carbonData = undefined

	const t = useTranslations(locale)
	const getCarbonData = async () => {
		try {
			const urlParams = new URLSearchParams(window.location.search)
			const websiteParam = urlParams.get('site')
			website = websiteParam
			websiteUrl = new URL(
				websiteParam.startsWith('http') ? websiteParam : `https://${websiteParam}`
			).origin
			if (websiteParam.replace(/https?:\/\//, '') !== website.replace(/https?:\/\//, ''))
				window.location.search = 'site=' + websiteUrl
			const fetchUrl = new URL(url, window.location.origin)
			fetchUrl.searchParams.set('site', websiteUrl)
			const carbonResult = await fetch(fetchUrl).then((res) => res.json())
			if (!Object.keys(carbonResult || {}).length) throw 'empty object response'
			state = 'success'
			const parsedResult = parseCarbonResult(carbonResult)
			sessionStorage.setItem(prefix + website, JSON.stringify(parsedResult))
			return parsedResult
		} catch {
			state = 'error'
		}
	}
	onMount(async () => {
		carbonData = await getCarbonData()
	})
	const wrapperClass = [...resultCardClass, 'gap-4', 'min-h-[540px]']
</script>

<div class="flex flex-col gap-4">
	{#if website && state !== 'error'}
		<h1 use:classList={[displayMd, 'font-bolder']}>{@html t('calculator.title', { website })}</h1>
	{/if}
	{#if state === 'error'}
		<ErrorPage {resultUrl} {locale} {website} />
	{:else}
		<div use:classList={wrapperClass}>
			<CarbonResult carbonResult={carbonData} {state} {locale} {website} animated={true} />
			{#if state === 'success' && newTestUrl}
				<div class="flex justify-end text-right">
					<a use:classList={[buttonBase, buttonLg, buttonTertiary]} href={newTestUrl}>
						{@html t('action.new-test')}
					</a>
				</div>
			{/if}
		</div>
	{/if}
</div>
