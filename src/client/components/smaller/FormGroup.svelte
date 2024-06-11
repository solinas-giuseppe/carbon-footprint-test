<script lang="ts">
	import { formGroup } from '@/utils/inputs.js'
	import FormMessage from '@/client/components/smaller/FormMessage.svelte'
	import { classList } from '@/client/directives/classList'

	export let error: string = ''
	export let success: string = ''
</script>

<div use:classList={[formGroup]}>
	<slot />
	{#if error}
		<FormMessage type="error">{@html error}</FormMessage>
	{/if}
	{#if success}
		<FormMessage type="success">{@html success}</FormMessage>
	{/if}
</div>
