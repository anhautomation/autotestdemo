const puppeteer = require('puppeteer');
     
class CompanyListPage  {

    async searchCompany(page, text) {
        let companySearch = await page.$x("//input[contains(@placeholder,'Tìm kiếm theo tên công ty')]");
        await companySearch[0].type(text);
        await page.keyboard.press("Enter");
    }
    async openChangePasswordPopup(page){
        let welcomeXpath = "//div[.//*[contains(text(),'Xin chào')]]";
        await page.waitForXPath(welcomeXpath, {visible: true});
        await page.hover("#__next > section > header > div > div > div.ant-row.ant-row-middle > div:nth-child(3) > div > div.ant-col.text-right > small");
        await page.waitFor(1500);
        await page.evaluate(() => {
          const $el = document.querySelector("body > div:nth-child(43) > div > div > ul > li:nth-child(1) > span");
          $el.click();
        });
    }
    async signout(page){
        await page.hover("#__next > section > header > div > div > div.ant-row.ant-row-middle > div:nth-child(3) > div > div.ant-col.text-right > small");
        await page.waitFor(1500);
        await page.evaluate(() => {
          const $el = document.querySelector("body > div:nth-child(43) > div > div > ul > li:nth-child(2) > span");
          $el.click();
        });
    }
}
    
module.exports = CompanyListPage;