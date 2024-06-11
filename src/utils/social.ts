export type SocialIconItem = {
	title: string
	href: string
	icon: 'linkedin' | 'whatsapp' | 'whatsapp-inner' | 'instagram' | 'instagram-inner' | 'messenger'
}

export const getSocialIconsList = (t: Function, list = []): SocialIconItem[] => {
	const availableSocialIcons = {
		linkedin: { title: t('action.linkedin'), href: '#', icon: 'linkedin' as const },
		whatsapp: { title: t('action.whatsapp'), href: '#', icon: 'whatsapp' as const },
		instagram: { title: t('action.instagram'), href: '#', icon: 'instagram' as const },
		messenger: { title: t('action.messenger'), href: '#', icon: 'messenger' as const },
		facebook: { title: t('action.facebook'), href: '#', icon: 'facebook' as const }
	}

	return list && list.length
		? list.map((k) => availableSocialIcons[k])
		: Object.values(availableSocialIcons)
}
