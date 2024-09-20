const fs = require('fs');
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const DataFile = require('../testData/LoginUserDeatils.json');
//immport userDetails
test.describe('Login Page Tests', () => {
  let loginPage;
  let page;
  let context;
  let browser;
  test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });
  test.afterEach(async ({ page }) => {
    await page.close();
    await context.close();
  });



  test('User should able to login with Valid username and password', async ({ page }) => {
    let userDetails
    //const userDetails = JSON.parse(fs.readFileSync('LoginUserDeatils.json', 'utf-8'));
    try {
      userDetails = JSON.parse(fs.readFileSync(DataFile, 'utf-8'));
    }
    catch (e) {
      console.log('error' + e);
    }
    console.log(userDetails);
    expect(userDetails).not.toBeNull();
    if (userDetails) {
      console.log('username' + userDetails.userName)
      await loginPage.login(userDetails.userName, userDetails.password);
      const welcomeMessage = await loginPage.getLoggedInUserMessageText();
      const userName = await loginPage.getLoggedInUserNameText();
      expect(welcomeMessage).toContain(userDetails.welcomeMessage);
      expect(userName).toBe(userDetails.userName);
    }
    console.log('User should able to login with Valid username and password completed ,cleaning the data  ')
  });
  test('should not login with invalid details', async ({ page }) => {
    console.log('User details:', DataFile);

    if (!DataFile || !DataFile.invalidUserName) {
      throw new Error('Invalid user details not found in the data file');
    }
    console.log(DataFile.invalidUserName)
    await loginPage.login(DataFile.invalidUserName, DataFile.invalidPassword);
    await page.waitForLoadState('networkidle');
    const errorMessage = await loginPage.getErrorMessageText();
    expect(errorMessage).toContain(DataFile.wrongCredentailsMessage);
    console.log('User should not able able to login with invalid username and password completed ,cleaning the data  ')
  });

  test('User should not able login with blank username and password', async ({ page }) => {
    await loginPage.login('', '');
    await page.waitForLoadState('networkidle');
    const errorMessage = await loginPage.getErrorMessageText();
    expect(errorMessage).toBe(DataFile.invalidMessage); // Adjust the expected error message as needed
    console.log('User should not able able to login with blank username and password completed ,cleaning the data  ')
  });
});