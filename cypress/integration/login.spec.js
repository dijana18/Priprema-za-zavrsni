/// <reference types="Cypress" />
import { loginPage } from '../page_objects/loginPage'

describe('login functionality', () => {

    before('visit login page', () => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        loginPage.loginHeading.should('have.text', 'Log in with your existing account')
    })

    it('login with valid data', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/login'
        }).as('successfullogin');

        loginPage.login('dijananestorovic18@gmail.com', '12345')

        cy.wait('@successfullogin').then(interception => {
            console.log('RESPONSE', interception)
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.statusMessage).eq('OK');
            expect(interception.response.body.user.id).eq(1062)
        })

        cy.url().should('include', '/my-organizations')
    })
})