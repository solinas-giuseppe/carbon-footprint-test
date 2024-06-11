export const prerender = false
export async function GET({ request }) {
	const requestUrl = new URL(request.url)
	const site = requestUrl.searchParams.get('site')
	const fetchUrl = new URL('/site', import.meta.env.CARBON_API_ENDPOINT)
	fetchUrl.searchParams.set('url', site)
	try {
		const carbonRequest = await fetch(fetchUrl)
		const text = await carbonRequest.text()
		return new Response(text)
	} catch (err) {
		console.log('ERROR', err)
		return new Response(JSON.stringify({ error: 'server error' }))
	}
}
