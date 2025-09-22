class RegisterPage {
  constructor(page) {
    this.page = page;
    // Sign Up locators
    this.signupBtn = page.locator("//a[@aria-label='Create a new account']");
    this.FullName = page.locator("//input[@id='web_user_name']");
    this.LastName = page.locator("//input[@id='web_user_email']");
    this.passwordField = page.locator("//input[@id='web_user_password']");
    this.ConfirmPassword = page.locator("//input[@id='web_user_password_confirmation']");
    this.signUpBtn2 = page.locator("//button[@name='button']");
    this.successPopup = page.locator("//a[@aria-label='Home page']");

    // Sign In locators
    this.LoginBtn = page.locator("//a[normalize-space()='Sign In']");
    this.EmailField = page.locator("//input[@id='magic-sign-in-email']");
    this.PassField = page.locator("//input[@id='magic-sign-in-password']");
    this.SignInBtn = page.locator("//button[@name='button']");
    this.loginSuccessPopup = page.locator("//div[@class='hide-for-small-only']//h3[contains(text(),'Welcome, Abu.')]");
  }

  async signUp(firstName, email, password, confirmPassword) {
    await this.signupBtn.click();
    await this.page.waitForTimeout(5000);
    await this.FullName.fill(firstName);
    await this.LastName.fill(email);
    await this.passwordField.fill(password);
    await this.ConfirmPassword.fill(confirmPassword);
    await this.signUpBtn2.click();
    await this.page.waitForTimeout(10000);
  }

  async getSuccessPopupText() {
    await this.successPopup.waitFor({ state: 'visible' });
    return await this.successPopup.textContent();
  }

  async signIn(email, password) {
    await this.LoginBtn.click();
    await this.EmailField.fill(email);
    await this.PassField.fill(password);
    await this.SignInBtn.click();
  }

  async getLoginSuccessPopupText() {
    await this.loginSuccessPopup.waitFor({ state: 'visible' });
    return await this.loginSuccessPopup.textContent();
  }
}

module.exports = RegisterPage;
