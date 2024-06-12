const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateEmail = (
	email: string,
	t: Function,
	messageKeys: { empty?: string; invalid?: string } = {}
) => {
	const keys = {
		empty: 'form.errors.email_empty',
		invalid: 'form.errors.email_invalid',
		...messageKeys
	}

	if (!email) {
		return t(keys.empty)
	}
	if (!emailRegex.test(email)) {
		return t(keys.invalid)
	}
}
