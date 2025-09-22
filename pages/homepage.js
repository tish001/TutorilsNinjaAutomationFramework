const BasePage = require("../utils/basePage");
class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.eCommerceLink = page.locator(
      "//span[normalize-space()='E-Commerce Site']"
    );
    this.demoSiteLink = page.locator("//a[@class='text-blue-600']");
  }
  async goToDemoSite() {
    await this.eCommerceLink.click();
    await this.demoSiteLink.click();
    
  }
}
module.exports = HomePage;
