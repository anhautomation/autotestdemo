const puppeteer = require("puppeteer");
const testsetup = require("../../testsetup");
const config = require("../../config/bizzi_config");
const LoginPage = require("../../pages/loginpage");

describe("login - username and password are empty", ()=> {
  let loginPage = new LoginPage();
  let usernameRequiredError = "Tên đăng nhập không được bỏ trống";
  let passwordRequiredError = "Mật khẩu không được bỏ trống";
  let browser;
  let page;
  beforeAll(async() => {
    jest.setTimeout(9999999);
    browser = await testsetup.testsetup();
    page = await browser.newPage();
    await page.goto(config.webapp.url);
    await loginPage.clickSubmit(page);
  });
  afterAll(async() => {
    await browser.close();
  });
  test("register - username is empty", async () => {
    let result = true;
    try{
      await page.waitForXPath("//*[contains(text(),'" + usernameRequiredError + "')]",{visible:true, timeout: 10000});
    }catch{
      result = false;
    }
    expect(result).toEqual(true);
  }, 10000);
  test("register - password is empty", async () => {
    let result = true;
    try{
      await page.waitForXPath("//*[contains(text(),'" + passwordRequiredError + "')]",{visible:true, timeout: 10000});
    }catch{
      result = false;
    }
    expect(result).toEqual(true);
  }, 10000);
})

describe("login - invalid username or password", ()=> {
  let loginPage = new LoginPage();
  let messageError = "Sai tên đăng nhập hoặc mật khẩu!";
  let browser;
  let page;
  beforeEach(async() => {
    jest.setTimeout(9999999);
    browser = await testsetup.testsetup();
    page = await browser.newPage();
    await page.goto(config.webapp.url);
  });
  afterEach(async() => {
    await browser.close();
  });
  test("login - wrong username", async () => {
    let result = true;
    try{
      await loginPage.typeUserName(page, "abcd");
      await loginPage.typePassword(page, config.webapp.password);
      await loginPage.clickSubmit(page);
      await page.waitForXPath("//*[contains(text(),'" + messageError + "')]",{visible:true, timeout: 50000});
    }catch{
      result = false;
    }
    expect(result).toEqual(true);
  }, 50000);
  test("login - wrong password", async () => {
    let result = true;
    try{
      await loginPage.typeUserName(page, config.webapp.user);
      await loginPage.typePassword(page, "abcd");
      await loginPage.clickSubmit(page);
      await page.waitForXPath("//*[contains(text(),'" + messageError + "')]",{visible:true, timeout: 50000});
    }catch{
      result = false;
    }
    expect(result).toEqual(true);
  }, 50000);
})

