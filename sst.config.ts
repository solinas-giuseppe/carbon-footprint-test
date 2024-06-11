import type { SSTConfig } from 'sst'
import { AstroSite } from 'sst/constructs'

export default {
	config(_input) {
		return {
			name: 'carbon-api',
			region: 'eu-west-1'
		}
	},
	stacks(app) {
		app.stack(function Site({ stack }) {
			const site = new AstroSite(stack, 'carbon-footprint-test')
			stack.addOutputs({
				url: site.url
			})
		})
	}
} satisfies SSTConfig
