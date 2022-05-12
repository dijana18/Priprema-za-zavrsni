/// <reference types="Cypress" />

describe('test example for login via backend', () => {

    beforeEach('login via backend', () => {
        cy.loginViaBackend()
    })

    it.only('validate page', () => {
        cy.visit('/');
        cy.url().should('include', '/my-organizations')
    })

})