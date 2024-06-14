import { stripTags } from '@/utils/string'
import { defaultLang as locale } from '../../src/i18n/ui'
import { useTranslations } from '../../src/i18n/utils'

const t = useTranslations(locale)

const invalidSite = 'invalid-site'
const validSite = 'www.google.com'

describe('User performs a calculation with an invalid website', () => {
	beforeEach(() => {
		cy.viewport(1440, 1024)
		cy.stubCalculation()
		cy.visit('http://localhost:4321/en/')
	})

	it('sees the expected content on the home page', () => {
		cy.get('h1').should('contain.text', 'Your website footprint')
		cy.get('p').should('contain.text', 'The internet consumes a lot of electricity.')
		cy.get('form').find('input[name="site"]').should('exist')
	})

	it('fails to calculate impact for the invalid website', () => {
		cy.get('input[name="site"]').type(invalidSite, { delay: 0 }).should('have.value', invalidSite)
		cy.contains(t('websiteform.button')).click()
		cy.location('pathname').should('match', /\/en\/result\//)
		cy.wait('@calculationApiCall')
		cy.get('h1').should('contain.text', t('pages.error.title'))
		cy.get('p').should(
			'contain.text',
			` we could not successfully calculate the carbon impact for ${invalidSite}`
		)
	})

	it('can still retry after a failed attempt', () => {
		cy.get('input[name="site"]').type(invalidSite, { delay: 0 }).should('have.value', invalidSite)
		cy.contains(t('websiteform.button')).click()
		cy.wait('@calculationApiCall')
		cy.get('h1').should('contain.text', t('pages.error.title'))
		cy.get('input[name="site"]').type(validSite, { delay: 0 }).should('have.value', validSite)
		cy.contains(t('websiteform.button')).click()

		cy.get('h1').should('contain.text', 'Your website footprint')
	})
})

describe('User performs a calculation with a valid website', () => {
	beforeEach(() => {
		cy.viewport(1440, 1024)

		cy.stubCalculation()
		cy.visit('http://localhost:4321/en/')
	})

	it('sucessfully calculates the impact for a valid website', () => {
		cy.get('input[name="site"]').type(validSite, { delay: 0 }).should('have.value', validSite)
		cy.contains(t('websiteform.button')).click()
		cy.location('pathname').should('match', /\/en\/result\//)
		cy.wait('@calculationApiCall')
		cy.get('h1').should('contain.text', stripTags(t('calculator.title', { website: validSite })))
		// check calculator output
		cy.contains(t('result.title')).should('be.visible')
		cy.contains(stripTags(t('result.content', { website: validSite, percentage: 77 }))).should(
			'be.visible'
		)
		cy.contains(t('result.green-server.title')).should('be.visible')
		cy.contains(t('result.green-server.title')).next().should('contain.text', t('utils.yes'))
		// check that bytes card contains numbers
		cy.contains(t('result.bytes.title')).should('be.visible')
		cy.contains(t('result.bytes.title'))
			.next()
			.find('span')
			.first()
			.invoke('text')
			.should('match', /^[0-9]\d*(\.\d+)?$/)
		// add more assertions if needed
	})

	it('finds the calculation in the previous calculations list', () => {
		cy.get('input[name="site"]').type(validSite, { delay: 0 }).should('have.value', validSite)
		cy.contains(t('websiteform.button')).click()
		cy.location('pathname').should('match', /\/en\/result\//)
		cy.wait('@calculationApiCall')
		cy.contains(t('action.new-test')).click()
		cy.contains(t('results-list.title')).should('be.visible')
		cy.get('h3')
			.first()
			.should('have.text', stripTags(t('results-list.item.title.open', { website: validSite })))
		cy.contains(t('action.collapse')).should('be.visible')
		cy.contains(t('result.title')).should('be.visible')
	})
})
