// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content'
// 2. Define your collection(s)
const featureCardSchema = z.object({
	title: z.string(),
	content: z.string()
})

const pricingPlanSchema = z.object({
	name: z.string(),
	description: z.string(),
	price: z.string(),
	currency: z.string(),
	features: z.array(z.number())
})

const pages = defineCollection({
	type: 'content', // v2.5.0 and later
	schema: z.object({
		title: z.string(),
		seoTitle: z.string(),
		description: z.string(),
		featureCards: z.array(featureCardSchema).optional(),
		plans: z.array(pricingPlanSchema).optional()
	})
})
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = { pages: pages }
