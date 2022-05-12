/// <reference types="Cypress" />
import { faker } from '@faker-js/faker';
import { profilePagePersonalInfo } from "../page_objects/profilePagePersonalInfo";
import { loginPage } from '../page_objects/loginPage'
import { account } from '../page_objects/account'
import { profilePageChangeEmail } from '../page_objects/profilePageChangeEmail';
import { profilePageChangePassword } from '../page_objects/profilePageChangePassword';

describe('profile page', () => {
    let permanentPassword = '12345old',
        testPassword = '12345678',
        permanentEmail = 'dijananestorovic18@gmail.com',
        testEmail = 'test1357@gmail.com',
        permanentFirstName = 'Dijana',
        permanentLastName = 'Nestorovic'

    let profileData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName()
    }

    before('login', () => {
        cy.visit('/login');
        loginPage.login(permanentEmail, permanentPassword);
        cy.url().should('include', '/my-organizations')
    })

    it('change first and last name', () => {
        account.userNameBtn.click();
        account.profileButton.click();
        profilePagePersonalInfo.updatePersonalInfo(profileData.firstName, profileData.lastName);
        profilePagePersonalInfo.firstNameInput.should('have.value', profileData.firstName);
        profilePagePersonalInfo.lastNameInput.should('have.value', profileData.lastName)
        account.profileName.should('have.text', `${profileData.firstName} ${profileData.lastName}`)
    })

    it('set first and last name values to old ones', () => {
        // account.userNameBtn.click();
        // account.profileButton.click();
        profilePagePersonalInfo.firstNameInput.scrollIntoView();
        profilePagePersonalInfo.updatePersonalInfo(permanentFirstName, permanentLastName);
        profilePagePersonalInfo.firstNameInput.should('have.value', permanentFirstName);
        profilePagePersonalInfo.lastNameInput.should('have.value', permanentLastName)
        account.profileName.should('have.text', `${permanentFirstName} ${permanentLastName}`)
    })

    it('change email', () => {
        account.userNameBtn.click();
        account.profileButton.click();
        profilePageChangeEmail.changeEmail(testEmail, permanentPassword);
        profilePageChangeEmail.newEmailAddressInput.should('have.value', testEmail);
    })

    it('login with new email and set old email back', () => {
        cy.visit('/login');
        loginPage.login(testEmail, permanentPassword);
        cy.url().should('include', '/my-organizations')
        account.userNameBtn.click();
        account.profileButton.click();
        profilePageChangeEmail.changeEmail(permanentEmail, permanentPassword);
        profilePageChangeEmail.newEmailAddressInput.should('have.value', permanentEmail);
    })

    it('change password', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/update-password'
        }).as('updatePassword');

        account.userNameBtn.click();
        account.profileButton.click();
        profilePageChangePassword.changePassword(permanentPassword, testPassword);
        cy.wait('@updatePassword').then(interception => {
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.statusMessage).eq('OK');
        })
    })

    it('login with new password and set old password back', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/update-password'
        }).as('updatePassword');

        cy.visit('/login');
        loginPage.login(permanentEmail, testPassword);
        cy.url().should('include', '/my-organizations')
        account.userNameBtn.click();
        account.profileButton.click();
        profilePageChangePassword.changePassword(testPassword, permanentPassword);
        cy.wait('@updatePassword').then(interception => {
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.statusMessage).eq('OK');
        })
    })

    it('try deleting account with invalid password', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/users-delete-account'
        }).as('unsuccessfuldeletion');

        cy.visit('/login');
        loginPage.login(permanentEmail, permanentPassword);
        cy.url().should('include', '/my-organizations')

        account.userNameBtn.click();
        account.profileButton.click();
        cy.get('.vs-c-btn--warning').scrollIntoView().click()
        cy.get('.vs-c-modal__body').find('input').type('12345test')
        cy.get('button[name="save-btn"]').click()
        cy.wait('@unsuccessfuldeletion').then(interception => {
            expect(interception.response.statusCode).eq(403);
            expect(interception.response.statusMessage).eq('Forbidden');
        })

    })

})