/// <reference types="Cypress" />
import { loginPage } from '../page_objects/loginPage';
import { profilePageChangePassword } from '../page_objects/profilePageChangePassword';
import { account } from '../page_objects/account'

describe('test change password', () => {
    let oldPassword = '12345'
    let newPassword = '12345changed'

    before('login', () => {
        cy.visit('/login');
        loginPage.login('dijananestorovic18@gmail.com', oldPassword);
        cy.url().should('include', '/my-organizations')
    })

    it('change password', () => {
        account.userNameBtn.click();
        account.profileButton.click();
        profilePageChangePassword.changePassword(oldPassword, newPassword)
    })

    it('logout and check successful login with new password', () => {
        
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/login'
        }).as('successfullogin');
        
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/logout'
        }).as('successfullogout');

        cy.get('span[class="el-dropdown-link"]').click();
        cy.get('a[href= "/account/settings"]').click();
        cy.get('div[class="vs-c-logout"]').click()
        cy.wait('@successfullogout').then(interception => {
            console.log('RESPONSE', interception)
            expect(interception.response.statusCode).eq(201);
        })

        loginPage.login('dijananestorovic18@gmail.com', newPassword)

        cy.wait('@successfullogin').then(interception => {
            console.log('RESPONSE', interception)
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.statusMessage).eq('OK');
        })

        cy.url().should('include', '/my-organizations')
    })

    it('change password to old one', () => {
        account.userNameBtn.click();
        account.profileButton.click();
        profilePageChangePassword.changePassword(newPassword, oldPassword)
    })
    
})