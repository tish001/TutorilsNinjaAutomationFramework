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
  test("Checkout form allows editing Zip Code", async () => {
    await cartPage.newZipCode();
  });
});
