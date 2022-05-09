/// <reference types="Cypress" />
import { faker } from '@faker-js/faker';
import { profilePagePersonalInfo } from "../page_objects/profilePagePersonalInfo";
import { loginPage } from '../page_objects/loginPage'
import { account } from '../page_objects/account'
import { profilePageChangeEmail } from '../page_objects/profilePageChangeEmail';
import { profilePageChangePassword } from '../page_objects/profilePageChangePassword';

describe('test profile page', () => {
    let profileData = {
        firstName:'',
        lastName: ''
    }

    before('login', () => {
        profileData.firstName = faker.name.firstName(),
        profileData.lastName = faker.name.lastName();

        cy.visit('/login');
        loginPage.login('dijananestorovic18@gmail.com', '12345');
        cy.url().should('include', '/my-organizations')
    })

    it('update first and last name', () => {
        account.userNameBtn.click();
        account.profileButton.click();
        profilePagePersonalInfo.updatePersonalInfo(profileData.firstName, profileData.lastName);
        profilePagePersonalInfo.firstNameInput.should('have.value', profileData.firstName);
        profilePagePersonalInfo.lastNameInput.should('have.value', profileData.lastName)
    })

    it('change email', () => {
        profilePageChangeEmail.changeEmail('test1@gmail.com', '12345');
        profilePageChangeEmail.newEmailAddressInput.should('have.value', 'test1@gmail.com');
    })

    it('change password', () => {
        profilePageChangePassword.changePassword('12345', '12345678')
    })


})