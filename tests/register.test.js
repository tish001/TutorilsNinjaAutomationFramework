const { test, expect, chromium } = require('@playwright/test');
const BasePage = require('../utils/basePage');
const RegisterPage = require('../pages/RegisterPage');
const testData = require('../utils/testData');

let browser;
let context;
let page;
let basePage;
let registerPage;

test.describe('Register Page', () => {

  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();

    basePage = new BasePage(page);
    registerPage = new RegisterPage(page);
    await basePage.navigateTo();
    await page.waitForLoadState('domcontentloaded');
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
    await browser.close();
  });

  test('Register with valid user', async () => {
    const { FirstName, emailField, Pass, ConfirmPass } = testData.validUser;
    await registerPage.signUp(FirstName, emailField, Pass, ConfirmPass);

    const successPopupText = await registerPage.getSuccessPopupText();
    expect(successPopupText.trim()).toBe(testData.RegisterSuccessPopup);
  });

  test('Login with valid user', async () => {
    const { ValidEmail, validPassword } = testData.validUser;
    await registerPage.signIn(ValidEmail, validPassword);

    const successPopupText = await registerPage.getLoginSuccessPopupText();
    expect(successPopupText.trim()).toBe(testData.loginSuccessPopup);
  });

});
