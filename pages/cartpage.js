const BasePage = require("../utils/basePage");

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.addBtn = this.page.locator(
      "//div[@class='products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6']//div[1]//div[1]//button[1]"
    );
    this.getPopup = this.page.locator(
      "//div[contains(text(),'Added to cart')]"
    );

    this.removeItem = this.page.locator(
      "//div[@class='products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6']//div[1]//div[1]//button[1]"
    );
    this.checkoutOption = this.page.locator(
      "//*[name()='path' and contains(@d,'M528.12 30')]"
    );
    this.checkoutBtn = this.page.locator(
      "//span[normalize-space()='Checkout']"
    );
    this.zipCode = this.page.locator("//input[@value='1207']");
    this.removePopUp = this.page.locator("//ol[@dir='ltr']//li");
  }
  async addToCart() {
    await this.addBtn.click();
  }
  async removeFromCart() {
    await this.removeItem.click();
  }
  async checkoutItem() {
    await this.addBtn.click();
    await this.checkoutOption.click();
    await this.checkoutBtn.click();
    await this.page.waitForTimeout(3000);
  }
  async newZipCode() {
    await this.addBtn.click();
    await this.checkoutOption.click();
    await this.checkoutBtn.click();
    await this.zipCode.fill("");
    await this.page.waitForTimeout(3000);
    await this.zipCode.fill("1204");
    await this.page.waitForTimeout(1000);
  }
  async getSuccessPopupText() {
    await this.getPopup.waitFor({ state: "visible" });
    return await this.getPopup.textContent();
  }

  async removeFromCartPopUp() {
    await this.removePopUp.waitFor({ state: "visible" });
    return await this.removePopUp.textContent();
  }
}

module.exports = CartPage;
