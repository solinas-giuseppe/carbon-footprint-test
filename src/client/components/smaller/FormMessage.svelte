<script lang="ts">
	import Icon from '@/client/components/smaller/Icon.svelte'
	import { classList } from '@/client/directives/classList'
	import { textSm } from '@/utils/typo'
	export let type: 'success' | 'error'
	let icon = (() => {
		switch (type) {
			case 'error':
				return 'form-error' as const
			case 'success':
				return 'form-success' as const
		}
	})()
	let color = (() => {
		switch (type) {
			case 'error':
				return 'var(--error-600)'
			case 'success':
				return 'var(--success-600)'
		}
	})()
	let colorClass = (() => {
		switch (type) {
			case 'error':
				return 'text-error-600'
			case 'success':
				return 'text-success-600'
		}
	})()
</script>

<span use:classList={['flex', 'items-center', 'gap-0.5', colorClass]}>
	{#if icon}
		<Icon name={icon} size="2" fillColor={color} />
	{/if}
	<span use:classList={[textSm, 'font-semibold']}>
		<slot />
	</span>
</span>
