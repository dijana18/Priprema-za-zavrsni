class HomePage {

    get addOrganizationItem() {
        return cy.get('div[class="vs-c-my-organization vs-c-my-organization--add-new not-sortable"]')
    }

    get organizationName() {
        return cy.get('input')
    }

    get nextButton() {
        return cy.get('button[name="next_btn"]')
    }

    addNewOrganization(name){
        this.addOrganizationItem.click()
        this.organizationName.type(name)
        this.nextButton.click()
        this.nextButton.click()
    }

}

export const homePage = new HomePage()