import { type ClassList } from '@/utils/props.js'

export function classList(node: Element, classList: ClassList) {
	// the initial space is kept to allow compatibility with svelte conditional classes
	// which prepend the value without accounting for the necessary space
	node.className += ' ' + [].concat(classList).flat().filter(Boolean).join(' ')
	return {
		destroy() {}
	}
}

export default () => {}
