const puppeteer = require("puppeteer");
const testsetup = require("../../testsetup");
const config = require("../../config/bizzi_config");
const LoginPage = require("../../pages/loginpage");

describe("login successfully", ()=> {
  let loginPage = new LoginPage();
  let browser;
  let page;
  beforeAll(async() => {
    jest.setTimeout(9999999);
    browser = await testsetup.testsetup();
    page = await browser.newPage();
    await page.goto(config.webapp.url);
  });
  afterAll(async() => {
    await browser.close();
  });
  test("login successfully", async () => {
    let result = true;
    try{
        await loginPage.typeUserName(page, config.webapp.user);
        await loginPage.typePassword(page, config.webapp.password);
        await loginPage.clickSubmit(page);
        await page.waitForNavigation({ waitUntil: 'networkidle0'});
        await page.waitForXPath("//*[contains(text(),'Danh sách công ty')]",{visible:true, timeout: 50000});
        let xpath = "//div[.//*[contains(text(),'Xin chào')]]";
        await page.waitForXPath(xpath, {visible: true});
    }catch(err){
      console.log(err);
      result = false;
    }
    expect(result).toEqual(true);
  }, 10000);
})