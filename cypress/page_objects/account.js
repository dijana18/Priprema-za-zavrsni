class Account {

    get profileName () {
        return cy.get('span[class="vs-c-user-name"]')
    }
    
    get userNameBtn () {
        return cy.get('span[class="el-dropdown-link"]')
    }

    get profileButton() {
        return cy.get('a[href= "/account/settings"]')
    }

}

export const account = new Account()