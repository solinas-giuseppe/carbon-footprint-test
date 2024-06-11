import { getRelativeLocaleUrl } from 'astro:i18n'
import { ui, defaultLang } from '@/i18n/ui'
import { useTranslations } from '@/i18n/utils'

export type MenuList = { displayText: string; title: string; href: string; target?: string }[]

export const getHeaderMenu = (locale: keyof typeof ui = defaultLang): MenuList => {
	const t = useTranslations(locale)
	return [
		{
			title: t('nav.features'),
			displayText: t('nav.features'),
			href: getRelativeLocaleUrl(locale, 'features')
		},
		{
			title: t('nav.pricing'),
			displayText: t('nav.pricing'),
			href: getRelativeLocaleUrl(locale, 'pricing')
		},
		{
			title: t('nav.carbon-test'),
			displayText: t('nav.carbon-test'),
			href: getRelativeLocaleUrl(locale, 'carbon-test')
		},
		{
			title: t('nav.contact'),
			displayText: t('nav.contact'),
			href: getRelativeLocaleUrl(locale, 'contact')
		},
		{
			title: t('nav.about'),
			displayText: t('nav.about'),
			href: getRelativeLocaleUrl(locale, 'about')
		}
	]
}

export const getFooterMenu = (locale: keyof typeof ui = defaultLang): MenuList => {
	const t = useTranslations(locale)
	return [
		{
			title: t('nav.about'),
			displayText: t('nav.about'),
			href: getRelativeLocaleUrl(locale, 'about')
		},
		{
			title: t('nav.contact'),
			displayText: t('nav.contact'),
			href: getRelativeLocaleUrl(locale, 'contact')
		},
		{
			title: t('nav.privacy-policy'),
			displayText: t('nav.privacy-policy'),
			href: getRelativeLocaleUrl(locale, 'privacy-policy'),
			target: '_blank'
		}
	]
}
