import { getCollection } from 'astro:content'

export const getPageByPath = async (path: string) => {
	const pages = await getCollection('pages')
	const regExp = new RegExp(`\/${path}$`, 'gi')

	const paths = pages
		.filter(({ slug }) => regExp.test(slug))
		.map((page) => {
			const [locale] = page.slug.split('/')
			return { params: { locale }, props: { page, locale } }
		})
	return paths
}
