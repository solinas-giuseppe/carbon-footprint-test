export const languages = {
	en: 'English',
	it: 'Italiano'
}

export const defaultLang = 'en'

export const ui = {
	en: {
		'nav.home': 'Home',
		'nav.features': 'Features',
		'nav.pricing': 'Pricing',
		'nav.carbon-test': 'Carbon Test',
		'nav.contact': 'Contact us',
		'nav.about': 'About us',
		'nav.privacy-policy': 'Privacy policy',
		'action.whatsapp': 'Text us on whatsapp',
		'action.linkedin': 'Follow us on linkedin',
		'action.instagram': 'Follow us on instagram',
		'action.messenger': 'Text us on messenger',
		'action.facebook': 'Follow us on facebook',
		'action.buy': 'Buy',
		'action.expand': 'Expand',
		'action.collapse': 'Collapse',
		'action.new-test': 'Calculate other site',
		'pages.error.title': 'Ops...',
		'pages.error.content': `It looks like we could not successfully calculate the carbon impact for :website:.
Please double check the page url or write a new one.`,
		'footer.content': `We are trying to raise awareness on the impact websites have on our planet. Limit your website emissions by following few recommendations. `,
		'footer.copyright': `© :years:, All Rights Reserved`,
		'newsletter.title': 'Newsletter',
		'newsletter.content':
			'Be the first one to know about news and our next features to keep our planet saver.',
		'websiteform.website.label': 'Your website',
		'websiteform.website.placeholder': 'Write website url',
		'websiteform.button': 'Calculate',
		'newsletterform.email.label': 'Email',
		'newsletterform.email.placeholder': 'Write your email',
		'newsletterform.button': 'Sign up',
		'contactform.name.label': 'Name',
		'contactform.name.placeholder': 'Write your name',
		'contactform.email.label': 'Your email',
		'contactform.email.placeholder': 'Write your email',
		'contactform.message.label': 'Message',
		'contactform.message.placeholder': 'Write your message here...',
		'contactform.button': 'Send',
		'contactform.errors.name_empty': 'Name is required',
		'contactform.errors.email_empty': 'Email is required',
		'contactform.errors.message_empty': 'Message is required',
		'contactform.errors.email_invalid': 'Not a valid email',
		'calculator.title':
			'Your website footprint <span class="text-dsm text-primary-600">:website:</span>',
		'utils.price-per-year': '/year',
		'utils.per-page': '/page',
		'utils.per-page-load': '/page load',
		'utils.yes': 'Yes',
		'utils.no': 'Yes',
		'utils.unknown': 'Unknown',
		'result.rating': 'Rating',
		'result.title': 'Efficiency Rating',
		'result.content': ':website: is cleaner <br />than :percentage:% of web pages tested',
		'result.green-server.title': 'Green server?',
		'result.green-server.content': 'This website’s server runs on green energy',
		'result.bytes.title': 'Bytes',
		'result.bytes.content': 'The amount of bytes sent by this websites',
		'result.co2.title': 'CO<sub class="font-normal bottom-0">2</sub> produced',
		'result.co2.content': 'The approximate amount of CO2 transferred on each page load in grams',
		'result.kw.title': 'Energy in kw',
		'result.kw.content': 'The approximate amount of energy transferred on each page load',
		'results-list.title': 'Previous calculations',
		'results-list.item.title.closed':
			'Carbon impact for <span class="uppercase font-bolder">:website:</span>',
		'results-list.item.title.open':
			'<span class="uppercase font-bolder">Carbon impact for </span>:website:'
	},
	it: {
		'nav.home': 'Home',
		'nav.features': 'Caratteristiche',
		'nav.pricing': 'Prezzi',
		'nav.carbon-test': 'Test impatto ambientale',
		'nav.contact': 'Contatti',
		'nav.about': 'Chi siamo',
		'nav.privacy-policy': 'Informativa sulla privacy',
		'action.whatsapp': 'Scrivici su whatsapp',
		'action.linkedin': 'Seguici su linkedin'
	}
} as const
