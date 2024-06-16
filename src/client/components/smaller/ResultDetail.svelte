<script lang="ts">
	import { classList } from '@/client/directives/classList'
	import { animationBase } from '@/client/helpers/constants'
	import { displayXs, textSm } from '@/utils/typo'
	export let title: string
	export let content: string
	export let state: 'loading' | 'success'
	export let theme: 'success' | 'warning'
	export let index: number
	export let animated: boolean = false
	const loadingClass = ['bg-secondary-100']
	const successClass = ['bg-primary-100', 'text-primary-900']
	const warningClass = ['bg-warning-200', 'text-warning-400']
	const blockClass = [
		...[].concat($$props.class),
		'py-4 px-3',
		'rounded-8',
		state === 'loading' && ['animate-pulse']
	]
	const innerBlockClass = [
		'flex',
		'flex-col',
		'gap-1',
		'opacity-0',
		...(animated ? ['transition-opacity', '[animation-delay:var(--delay)]'] : [])
	]

	const getThemeClass = () => {
		switch (true) {
			case state === 'loading':
				return loadingClass
			case theme === 'success':
				return successClass
			case theme === 'warning':
				return warningClass
		}
	}
</script>

<div
	use:classList={[blockClass, getThemeClass()]}
	style={animated && `--delay: ${((animationBase / 1.5) * index) / 1000}s;`}
>
	<div
		use:classList={[innerBlockClass]}
		style="opacity: 0;"
		class:animate-fade-in={state === 'success'}
	>
		<h3 use:classList={[displayXs, 'font-bolder']}>{@html title}</h3>
		<slot />
		<p use:classList={[textSm, 'text-base-700']}>{@html content}</p>
	</div>
</div>
