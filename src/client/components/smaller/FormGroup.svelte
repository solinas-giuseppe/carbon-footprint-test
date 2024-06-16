<script lang="ts">
	import { formGroup } from '@/utils/inputs.js'
	import FormMessage from '@/client/components/smaller/FormMessage.svelte'
	import { classList } from '@/client/directives/classList'

	export let error: string = ''
	export let success: string = ''
	let group: HTMLElement

	$: {
		if (error && group) {
			const input = group.querySelector('input, textarea') as HTMLInputElement
			if (input) {
				input.setCustomValidity(error)
			}
		}
	}
</script>

<div use:classList={[formGroup, $$props.class]} bind:this={group}>
	<slot />
	{#if error}
		<FormMessage type="error">{@html error}</FormMessage>
	{/if}
	{#if success}
		<FormMessage type="success">{@html success}</FormMessage>
	{/if}
</div>
