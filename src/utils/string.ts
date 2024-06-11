export const stripTags = (html: string) => {
	const regExp = new RegExp(`<(?!\/?(?=\\s|\/?>))\/?[^>]+>`, 'gi')
	return String(html || '')
		.replace(regExp, '')
		.trim()
}

export const idAttribute = (input: string) => {
	// Trim the input to remove leading and trailing whitespace
	let sanitized = input.trim()

	// Replace invalid characters with underscores
	sanitized = sanitized.replace(/[^a-zA-Z0-9-_:.]/g, '_')

	// Ensure the ID starts with a letter, prepend 'id_' if it does not
	if (!/^[a-zA-Z]/.test(sanitized)) {
		sanitized = 'id_' + sanitized
	}

	return sanitized
}
