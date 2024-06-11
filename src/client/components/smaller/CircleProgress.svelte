<script lang="ts">
	import { useTranslations } from '@/i18n/utils.js'
	import { ui, defaultLang } from '@/i18n/ui.js'
	import { classList } from '@/client/directives/classList'
	import { displayXs, textXs } from '@/utils/typo'
	import { onMount } from 'svelte/internal' // needs to be imported from svelte/internal for tests to work
	import { animationBase } from '@/client/helpers/constants'
	export let locale: keyof typeof ui = defaultLang
	export let percentage: number
	export let animated: boolean = false
	let workingPercentage = 0
	let dashOffset: number = 0
	const circlePosition = 80
	const circleRadius = 72
	const circleThickness = 15
	const circumference = 2 * Math.PI * circleRadius
	$: dashOffset = animated ? circumference : percentage
	const t = useTranslations(locale)
	onMount(() => {
		workingPercentage = percentage
		setTimeout(
			() => {
				dashOffset = circumference - (workingPercentage / 100) * circumference
			},
			animated ? animationBase : 0
		)
	})
</script>

<div class="relative">
	<svg
		class="h-[10rem] w-[10rem] -rotate-90 transform"
		style={`--dash-offset: ${dashOffset}; --animation-speed: ${animationBase / 1000}s;`}
	>
		<circle
			cx={circlePosition}
			cy={circlePosition}
			r={circleRadius}
			stroke="var(--primary-600)"
			stroke-width={circleThickness}
			fill="transparent"
		/>

		<circle
			cx={circlePosition}
			cy={circlePosition}
			r={circleRadius}
			stroke="var(--primary-900)"
			stroke-width={circleThickness}
			fill="transparent"
			stroke-linecap="round"
			stroke-dasharray={circumference}
			stroke-dashoffset="var(--dash-offset)"
			class:animated-circle={animated}
		/>
	</svg>
	<div class="absolute inset-0 flex grow flex-col items-center justify-center">
		<div use:classList={[textXs, 'text-base-600']}>{@html t('result.rating')}</div>
		<div use:classList={[displayXs, 'text-base-700']}>{percentage}%</div>
	</div>
</div>

<style>
	.animated-circle {
		transition: stroke-dashoffset var(--animation-speed) ease;
	}
</style>
