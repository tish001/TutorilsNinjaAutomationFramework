const { test, expect } = require("@playwright/test");
const HomePage = require("../pages/homepage");
const LoginPage = require("../pages/loginPage");
const BasePage = require("../utils/basePage");
const testData = require("../utils/testData");
const CartPage = require("../pages/cartpage");

test.describe("Cart Page", () => {
  let basePage;
  let homePage;
  let loginPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    cartPage = new CartPage(page);

    await basePage.navigateTo("/");
    await page.waitForLoadState("domcontentloaded");
    await homePage.goToDemoSite();
    const { validEmail3, Validpass } = testData.validUser;
    await loginPage.login(validEmail3, Validpass);
  });

  test("Test add to cart product", async ({ page }) => {
    //  Navigate to demo site

    await cartPage.addToCart();
    const popUpTest = await cartPage.getSuccessPopupText();
    // console.log(popUpTest);
    expect(popUpTest.trim()).toBe(testData.popUpText);
  });
  test("Test remove form cart", async () => {
    await cartPage.removeFromCart();
    const popUpTest = await cartPage.removeFromCartPopUp();
    // console.log(popUpTest);
    expect(popUpTest.trim()).toBe(testData.popUpText);
  });
  test("Test checkout item ", async () => {
    await cartPage.checkoutItem();
  });

  test("Test Name field with valid first name", async () => {
    const { validFirstName } = testData.validUser;

    await cartPage.FirstNameCheck(validFirstName);
  });
  test("Test Name field with valid last name", async () => {
    const { validLastName } = testData.validUser;
    await cartPage.FirstNameCheck(validLastName);
  });
  test("Test first name with empty values", async ({ page }) => {
    await page.click("//span[normalize-space()='Continue']");
    const errorExists = await page
      .locator("//p[contains(text(),'First name is required')]")
      .count();
    if (errorExists === 0) {
      console.error(
        "❌ BUG: No validation message displayed for empty First Name field."
      );
    }
  });

  test("Checkout form allows editing Zip Code", async () => {
    const { newZipCode } = testData.validUser;
    await cartPage.TypenewZipCode(newZipCode);
  });
  test("Test checkout form submit with valid credentials", async () => {
    const { firstName, lastName } = testData.checkoutForm;
    await cartPage.checkoutFormSubmitSuccessfully(firstName, lastName);
    const successMsg = await cartPage.formSubmissionValidation();
    expect(successMsg.trim()).toBe(testData.validationText);
  });
});
