import { type ClassList } from '@/utils/props.js'

export function classList(node: Element, classList: ClassList) {
	node.className += ' ' + [].concat(classList).flat().filter(Boolean).join(' ')
	return {
		destroy() {}
	}
}

export default () => {}
