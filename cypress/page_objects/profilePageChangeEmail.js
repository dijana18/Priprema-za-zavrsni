class ProfilePageChangeEmail {

    get newEmailAddressInput() {
        return cy.get('input[name="email"]')
    }

    get currentPasswordInput() {
        return cy.get('div[class="el-input"]').eq(3)
    }

    get updateEmailBtn() {
        //return cy.get('div[class="vs-u-text--left"]').eq(1)
        return cy.get('div[class="vs-c-settings-section-wrapper"]').eq(1).find('button')
    }

    changeEmail(email, password) {
        this.newEmailAddressInput.clear().type(email)
        this.currentPasswordInput.type(password)
        this.updateEmailBtn.click()
    }

}

export const profilePageChangeEmail = new ProfilePageChangeEmail()