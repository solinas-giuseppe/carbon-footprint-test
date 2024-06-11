<script lang="ts">
	import ResultDetail from '@/client/components/smaller/ResultDetail.svelte'
	export let featureCards: Array<{ title: string; content: string }>
	const cardIndex = 0
</script>

<div class="grid grid-cols-4 gap-3 pt-3">
	{#each featureCards as { title, content }, index}
		<ResultDetail
			{title}
			{content}
			theme="success"
			index={cardIndex + index}
			state="success"
			animated={true}
		/>
	{/each}
</div>
