const puppeteer = require("puppeteer");
const testsetup = require("../../testsetup");
const config = require("../../config/bizzi_config");
const LoginPage = require("../../pages/loginpage");
const CompanyListPage = require("../../pages/companylistpage");
const ChangePasswordPopup = require("../../pages/changepasswordpopup");

describe("change password successfully", ()=> {
  let loginPage = new LoginPage();
  let companyListPage = new CompanyListPage();
  let changepasswordPopup = new ChangePasswordPopup();
  let browser;
  let page;
  beforeAll(async() => {
    jest.setTimeout(9999999);
    browser = await testsetup.testsetup();
    page = await browser.newPage();
    await page.goto(config.webapp.url);
    await loginPage.typeUserName(page, config.webapp.user);
    await loginPage.typePassword(page, config.webapp.password);
    await loginPage.clickSubmit(page);
  });
  afterAll(async() => {
    await browser.close();
  });
  test("change password successfully", async () => {
    let result = true;
    let passwordError = "Nhập lại mật khẩu không chính xác!";
    let newPassword = config.webapp.password;
    try{
        await page.waitForNavigation({ waitUntil: 'networkidle0'});
        await page.waitForXPath("//*[contains(text(),'Danh sách công ty')]",{visible:true, timeout: 50000});
        companyListPage.openChangePasswordPopup(page);
        await page.waitFor(2000);
        await changepasswordPopup.typeCurrentPassword(page, config.webapp.password);
        await changepasswordPopup.typeNewPassword(page, newPassword);
        await changepasswordPopup.typeConfirmNewPassword(page, newPassword + "1");
        await changepasswordPopup.clickUpdate(page);
        await page.waitForXPath("//*[contains(text(),'" + passwordError + "')]",{visible:true, timeout: 50000});
    }catch(err){
      console.log(err);
      result = false;
    }
    expect(result).toEqual(true);
  }, 50000);
})