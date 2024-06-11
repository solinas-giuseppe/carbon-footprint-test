export type PricingFeature = {
	order: number
	text: string
}

export type PricingItem = {
	name?: string
	description?: string
	price?: string
	currency?: string
	features?: number[]
}

export const getMockFeatures = () => [
	{
		order: 0,
		text: 'Advanced analytics and custom branding,'
	},
	{
		order: 1,
		text: 'Access to exclusive content or resources'
	},
	{
		order: 2,
		text: 'Increased storage or usage limits'
	},
	{
		order: 3,
		text: 'Priority customer support'
	},
	{
		order: 4,
		text: 'Customization options'
	},
	{
		order: 5,
		text: 'No advertisements'
	}
]
