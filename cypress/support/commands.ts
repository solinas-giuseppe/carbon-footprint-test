/// <reference types="cypress" />

import type { CarbonApiResponse } from '@/client/helpers/props'

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
	namespace Cypress {
		interface Chainable {
			stubCalculation(): Chainable<CarbonApiResponse>
			// drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
			// dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
			// visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
		}
	}
}
Cypress.Commands.add('stubCalculation', function () {
	console.log('INTERCEPT')
	cy.intercept(
		{
			method: 'GET',
			url: '/api/carbon-api/*'
		},
		function (request) {
			const requestUrl = new URL(request.url)
			const site = requestUrl.searchParams.get('site')
			console.log('--- > SITE', site, site === 'invalid-site')
			if (/invalid-site/.test(site)) {
				return request.reply({
					statusCode: 422,
					fixture: 'calculator_response_ko'
				})
			}
			return request.reply({
				statusCode: 200,
				fixture: 'calculator_response_ok'
			})
		}
	).as(`calculationApiCall`)
})
