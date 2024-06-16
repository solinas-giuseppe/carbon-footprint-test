<script lang="ts">
	import sizes, { type Size } from '@/utils/sizes.js'
	import { classList } from '@/client/directives/classList'

	export let name: 'form-error' | 'form-success'
	export let size: Size = 2.5
	export let fillColor: string = 'var(--base-000)'
	export let strokeColor: string = 'currentColor'
</script>

<div use:classList={$$props.class}>
	<svg class={sizes[size] || size}>
		<use
			href={['/assets/icons/all.svg', '#', name].join('')}
			style={`--fill: ${fillColor}; --stroke: ${strokeColor};`}
		></use>
	</svg>
</div>
