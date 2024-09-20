const fs = require('fs');
const { resourceUsage } = require('process');
class LoginPage {
    constructor(page) {
        this.page = page;

    }
    get userNameInput(){
        return this.page.locator("#username");

    }
    get passwordInput(){
        return this.page.locator("#password");
    }
    get LoginButton(){
        return this.page.locator("#signin-button");
    
    }
    get loggedInUserMessage() {
        return this.page.locator('#welcome-message');
    }
    get loggedInUserName(){
        return this.page.locator("p[data-id='username']");
    }
    get errorMessage(){
        return this.page.locator('#message');
    }
    async navigate() {
        
        await this.page.goto('/login');
       // await this.page.context().clearCookies();
    }
    async getLoggedInUserMessageText(){
        const welcomeMessage = await this.loggedInUserMessage.textContent();
        console.log('welcome messsge'+ welcomeMessage);
        return welcomeMessage;
    }
    async getLoggedInUserNameText(){
        //return this.loggedInUserName.innerText();
        const loggedInUserName = await this.loggedInUserName.textContent();
        console.log('logged in user name'+ loggedInUserName);
        return loggedInUserName;

    }
    async getErrorMessageText(){
        return await this.errorMessage.textContent();

    }

    async login(userName, password) {
        await this.userNameInput.fill(userName);
        await this.passwordInput.fill(password);
        await this.LoginButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    
    }
}
module.exports = {LoginPage};
