const BasePage = require("../utils/basePage");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailField = this.page.locator("//input[@id='email']");
    this.passwordInput = this.page.locator("//input[@id='password']");
    this.loginBtn = this.page.locator("//button[@type='submit']");
    this.Product = this.page.locator(
      "//h3[@class='text-xl font-black font-oswald mb-2 xs:mb-0']"
    );
    this.UnsuccessPopup = this.page.locator("//ol[@dir='ltr']//li");
    this.incorrectEmailPopUp = this.page.locator(
      "//div[contains(text(),'Password matched but email is incorrect.')]"
    );
    this.incorrectPassPopUp = this.page.locator(
      "//div[contains(text(),'Username matched but password is incorrect.')]"
    );
    this.emailErrMsg = this.page.locator(
      "//p[normalize-space()='Email is a required field']"
    );
    this.passErrMsg = this.page.locator(
      "//p[normalize-space()='Password is a required field']"
    );
    this.incorrectEmail = this.page.locator(
      "//p[normalize-space()='Username is incorrect.']"
    );
    this.incorrectPass = this.page.locator(
      "//p[@class='text-red-500 text-sm mt-1']"
    );
  }

  async login(email, password) {
    await this.emailField.fill(email);
    await this.page.waitForTimeout(1000);
    await this.passwordInput.fill(password);
    await this.page.waitForTimeout(1000);
    await this.loginBtn.click();
  }
  async loginWithoutEmail(password) {
    await this.passwordInput.fill(password);
    await this.page.waitForTimeout(1000);
    await this.loginBtn.click();
  }
  async loginWithoutPass(email) {
    await this.emailField.fill(email);
    await this.page.waitForTimeout(1000);
    await this.loginBtn.click();
  }
  async loginWithoutCredentials() {
    await this.loginBtn.click();
  }

  async getUnsuccessPopupText() {
    await this.UnsuccessPopup.waitFor({ state: "visible" });
    return await this.UnsuccessPopup.textContent();
  }
  async getPopupTextIncorrectEmail() {
    await this.incorrectEmailPopUp.waitFor({ state: "visible" });
    return await this.incorrectEmailPopUp.textContent();
  }
  async getPopupTextIncorrectPass() {
    await this.incorrectPassPopUp.waitFor({ state: "visible" });
    return await this.incorrectPassPopUp.textContent();
  }
}

module.exports = LoginPage;
