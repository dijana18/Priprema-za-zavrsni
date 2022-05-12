/// <reference types="Cypress" />
import { loginPage } from '../page_objects/loginPage'
import { homePage } from '../page_objects/homePage'
import { faker } from '@faker-js/faker';

describe('adding and deleting new organization', () => {

    let organizationName = faker.name.jobArea();

    before('login via backend', () => {
        cy.loginViaBackend()
    })

    it('validate page', () => {
        cy.visit('/')
        cy.url().should('include', '/my-organizations')
    })

    it('add new organization', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/organizations'
        }).as('addOrganization');

        homePage.addNewOrganization(organizationName)

        cy.wait('@addOrganization').then(interception => {
            console.log(interception)
            expect(interception.response.statusCode).eq(201);
        })

        //close info panel
        cy.get('.vs-c-close-modal').click()
    })

    it('delete added organization', () => {
        cy.get('.has-caret').find('a').last().click()
        cy.get('li[data-cy="organization-configuration"]').click()
        cy.get('.vs-c-settings-section-wrapper').last().find('button').click()

        //confirm deletion
        cy.get('.vs-c-modal__body').find('input').type('12345old');
        cy.get('button[name="save-btn"]').click();
    })
})