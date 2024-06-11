<script lang="ts">
	import { onMount } from 'svelte/internal'
	import type { CarbonObject } from '../helpers/props'
	import { storagePrefix } from '../helpers/constants'
	import CarbonResult from './CarbonResult.svelte'
	import { ui, defaultLang } from '@/i18n/ui.js'
	import { useTranslations } from '@/i18n/utils.js'
	import { resultCardClass } from '@/client/helpers/result-card'

	import Accordion from './smaller/Accordion.svelte'
	import AccordionItem from './smaller/AccordionItem.svelte'
	import { classList } from '../directives/classList'
	import { displaySm, textLg } from '@/utils/typo'
	import { buttonBase, buttonTertiary, buttonXl } from '@/utils/buttons'
	import { idAttribute } from '@/utils/string'
	export let locale: keyof typeof ui = defaultLang
	let websiteList: Array<CarbonObject & { website: string }>
	let initialKey = null

	const t = useTranslations(locale)
	onMount(() => {
		websiteList = Object.entries(sessionStorage)
			.slice(0, 10)
			.map(([website, result]) => ({
				...JSON.parse(result),
				website: website.replace(new RegExp(`^${storagePrefix}`), '')
			}))
			.sort((a, b) => (b.timestamp > a.timestamp ? 1 : -1))
		if (websiteList.length) initialKey = websiteList[0].website
	})
</script>

<div class="grid gap-3">
	{#if (websiteList || []).length && initialKey}
		<h2 use:classList={[displaySm, 'text-primary-900', 'font-bolder']}>
			{@html t('results-list.title')}
		</h2>
		<Accordion {initialKey}>
			{#each websiteList as { website, ...carbonData }}
				<AccordionItem key={website} class={[resultCardClass, 'mb-3']}>
					<div slot="header" let:open>
						<div class="flex w-full justify-between">
							<h3 use:classList={[textLg]}>
								{@html t(`results-list.item.title.${open ? 'open' : 'closed'}`, { website })}
							</h3>
							<span use:classList={[buttonBase, buttonTertiary, buttonXl]}>
								{open ? t('action.collapse') : t('action.expand')}
							</span>
						</div>
					</div>

					<div
						slot="body"
						class="mt-3"
						let:open
						id={idAttribute(website)}
						style={open ? '' : 'visibility: hidden;'}
					>
						<CarbonResult
							carbonResult={carbonData}
							state="success"
							{locale}
							{website}
							animated={false}
						/>
					</div>
				</AccordionItem>
			{/each}
		</Accordion>
	{/if}
</div>
