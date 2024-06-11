import { type SEOProps } from 'astro-seo'
import { stripTags } from './string'

const siteName = 'Carbon Footprint Test'
export const getTwitterCard = ({ title, description }) => {
	const twitterHandle = '@carbonFootprintTest'
	if (!title) return {}
	return {
		twitter: {
			card: 'summary',
			site: twitterHandle,
			title,
			description
		}
	}
}

export const getOpenGraphTags = ({ url, title, description, type = 'website', site }) => {
	return {
		openGraph: {
			basic: {
				url,
				title,
				type,
				image: new URL('/logo.png', site).toString()
			},
			optional: {
				description,
				site_name: siteName
			}
		}
	}
}

export const getPageMetaTags = ({
	title: dirtyTitle,
	description: dirtyDescription,
	url,
	site
}): SEOProps => {
	const titleTemplate = `%s — ${siteName}`
	const title = stripTags(dirtyTitle).substring(0, 60 - titleTemplate.length)
	const description = stripTags(dirtyDescription).substring(0, 300)
	const metaTags = {
		title,
		titleTemplate,
		charset: 'UTF-8',
		noindex: true,
		nofollow: true,
		description: description,
		canonical: url,
		extend: {
			link: [{ rel: 'icon', href: '/favicon.svg' }]
		},
		...getTwitterCard({ title, description }),
		...getOpenGraphTags({ url, title, description, site })
	}
	return metaTags as SEOProps
}
