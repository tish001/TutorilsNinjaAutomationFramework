const { test, expect } = require("@playwright/test");
const HomePage = require("../pages/homepage");
const LoginPage = require("../pages/loginPage");
const BasePage = require("../utils/basePage");
const testData = require("../utils/testData");

test.describe("Login Page", () => {
  let basePage;
  let homePage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    await basePage.navigateTo("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("Test Login with valid email", async ({ page }) => {
    //  Navigate to demo site
    await homePage.goToDemoSite();
    const { validEmail3, Validpass } = testData.validUser;
    await loginPage.login(validEmail3, Validpass);
    const userName = loginPage.Product;
    console.log(userName);
    await expect(userName).toHaveText("Products");
    const text = await userName.textContent();
    console.log("Logged in as:", text?.trim());
  });

  test("Test Login With invalid email and invalid password", async ({
    page,
  }) => {
    await homePage.goToDemoSite();
    const { inavalidEmail, inavalidPass } = testData.invalidUser;
    await loginPage.login(inavalidEmail, inavalidPass);
    const UnsuccessPopupText = await loginPage.getUnsuccessPopupText();
    console.log("UnsuccessPopupText", UnsuccessPopupText);
    expect(UnsuccessPopupText.trim()).toBe(testData.loginUnsuccessPopup);
  });

  test("Test Login without Email", async (page) => {
    await homePage.goToDemoSite();
    // const { inavalidEmail } = testData.invalidUser;
    const { Validpass } = testData.validUser;
    await loginPage.loginWithoutEmail(Validpass);

    const errMsg = await loginPage.emailErrMsg;
    // console.log(errMsg);
    expect(errMsg).toHaveText(testData.emailErrMsg);
  });

  test("Test Login without Password", async () => {
    await homePage.goToDemoSite();
    const { validEmail3 } = testData.validUser;
    await loginPage.loginWithoutPass(validEmail3);

    const errMsg = await loginPage.passErrMsg;
    // console.log(errMsg);
    expect(errMsg).toHaveText(testData.passErrMsg);
  });
  test("Test Login without Email and Pass", async () => {
    await homePage.goToDemoSite();
    await loginPage.loginWithoutCredentials();
    const emailErr = loginPage.emailErrMsg;
    const passErr = loginPage.passErrMsg;
    await expect(emailErr).toHaveText(testData.emailErrMsg);
    await expect(passErr).toHaveText(testData.passErrMsg);
  });
  test("Test Login with Incorrect Email", async () => {
    await homePage.goToDemoSite();
    const { inavalidEmail } = testData.invalidUser;
    const { Validpass } = testData.validUser; //using destructor
    await loginPage.login(inavalidEmail, Validpass);
    const emailErr = loginPage.incorrectEmail;
    await expect(emailErr).toHaveText(testData.incorrectEmail);
    const UnsuccessPopupText = await loginPage.getPopupTextIncorrectEmail();
    console.log("UnsuccessPopupText", UnsuccessPopupText);
    expect(UnsuccessPopupText.trim()).toBe(testData.incorrectEmailPopup);
  });
  test("Test Login with Incorrect password", async () => {
    await homePage.goToDemoSite();
    const { validEmail1 } = testData.validUser;
    const { inavalidPass } = testData.invalidUser; //using destructor
    await loginPage.login(validEmail1, inavalidPass);
    const emailErr = loginPage.incorrectPass;
    await expect(emailErr).toHaveText(testData.incorrectPass);
    const UnsuccessPopupText = await loginPage.getPopupTextIncorrectPass();
    console.log("UnsuccessPopupText", UnsuccessPopupText);
    expect(UnsuccessPopupText.trim()).toBe(testData.incorrectPassPopup);
  });
});
