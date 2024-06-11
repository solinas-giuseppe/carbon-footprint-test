import { ui, defaultLang } from '@/i18n/ui'

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/')
	if (lang in ui) return lang as keyof typeof ui
	return defaultLang
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang], replacements = {}) {
		return Object.entries(replacements).reduce((acc, [k, v]) => {
			return acc.replace(`:${k}:`, v || '')
		}, ui[lang][key] || ui[defaultLang][key])
	}
}
