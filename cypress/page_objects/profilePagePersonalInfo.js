class ProfilePagePersonalInfo {

    get uploadAvatar() {
        return cy.get('div[class="vs-c-avatar vs-c-settings-avatar-uploader"]')
    }

    get firstNameInput() {
        return cy.get('input[name="first_name"]')
    }

    get lastNameInput() {
        return cy.get('input[name="last_name"]')
    }

    get updatePersonalInfoBtn() {
        return cy.get('div[class="vs-u-text--left"]').eq(0)
    }

    updatePersonalInfo(firstName, lastName){
        this.firstNameInput.clear().type(firstName)
        this.lastNameInput.clear().type(lastName)
        this.updatePersonalInfoBtn.click()
    }

}

export const profilePagePersonalInfo = new ProfilePagePersonalInfo()