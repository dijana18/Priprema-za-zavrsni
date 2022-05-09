/// <reference types="Cypress" />
import { loginPage } from '../page_objects/loginPage'

describe('adding new organization', () => {

    before('login', () => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        loginPage.login('dijananestorovic18@gmail.com', '12345')

    })
    
    it('add new organization', () => {


    })
})