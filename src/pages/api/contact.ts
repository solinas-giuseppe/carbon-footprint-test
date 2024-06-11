export const prerender = false
export async function POST({ request }) {
	const formData = await request.formData()
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	const name = formData.get('name')
	const email = formData.get('email')
	const message = formData.get('message')
	const errorMessage = [
		name ? '' : 'name is required',
		email ? '' : 'email is required',
		emailRegex.test(email) ? '' : 'email is not valid',
		message ? '' : 'message is required'
	]
		.filter(Boolean)
		.join(', ')
	if (errorMessage) return new Response(JSON.stringify({ error: errorMessage }))
	try {
		const response = await fetch(import.meta.env.CONTACT_FORM_ENDPOINT, {
			method: 'POST',
			body: JSON.stringify({
				name,
				email,
				message
			})
		})
		if (response.ok) {
			return new Response(JSON.stringify({ success: true }))
		} else {
			return new Response(JSON.stringify({ error: 'request failed' }))
		}
	} catch (err) {
		console.log('ERROR', err)
		return new Response(JSON.stringify({ error: 'server error' }))
	}
}
