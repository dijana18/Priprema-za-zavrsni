class ProfilePageChangePassword {

    get currentPasswordInput() {
        return cy.get('div[class="el-input"]').eq(4)
    }

    get newPasswordInput() {
        return cy.get('div[class="el-input"]').eq(5)
    }

    get repeatNewPasswordInput() {
        return cy.get('div[class="el-input"]').eq(6)
    }

    get updatePasswordBtn() {
        //return cy.get ('div[class="vs-u-text--left"]').eq(2)
        return cy.get('div[class="vs-c-settings-section-wrapper"]').eq(2).find('button')
    }

    changePassword(currentPass, newPass){
        this.currentPasswordInput.type(currentPass)
        this.newPasswordInput.type(newPass)
        this.repeatNewPasswordInput.type(newPass)
        this.updatePasswordBtn.click()
    }

}

export const profilePageChangePassword = new ProfilePageChangePassword()