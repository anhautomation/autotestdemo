const puppeteer = require("puppeteer");
const testsetup = require("../../testsetup");
const config = require("../../config/bizzi_config");
const RegisterPage = require("../../pages/registerpage");

describe("register - step 1 - required field is empty", ()=> {
  let registerpage = new RegisterPage();
  let nameRequiredError = "Họ tên không được bỏ trống";
  let emailRequiredError = "Email không được để trống";
  let phoneRequiredError = "Số điện thoại không được để trống";
  let passwordRequiredError = "Mật khẩu không được để trống";
  let browser;
  let page;
  beforeAll(async() => {
    jest.setTimeout(9999999);
    browser = await testsetup.testsetup();
    page = await browser.newPage();
    await page.goto(config.webapp.url);
    await registerpage.openRegisterForm(page);
    await registerpage.clickContinueButton(page);
  });
  afterAll(async() => {
    await browser.close();
  });
  test("register - user name info is empty", async () => {
    let result = true;
    try{
      await page.waitForXPath("//*[contains(text(),'" + nameRequiredError + "')]",{visible:true, timeout: 10000});
    }catch{
      result = false;
    }
    expect(result).toEqual(true);
  }, 10000);
  test("register - email info is empty", async () => {
    let result = true;
    try{
      await page.waitForXPath("//*[contains(text(),'" + emailRequiredError + "')]",{visible:true, timeout: 10000});
    }catch{
      result = false;
    }
    expect(result).toEqual(true);
  }, 10000);
  test("register - phone is empty", async () => {
    let result = true;
    try{
      await page.waitForXPath("//*[contains(text(),'" + phoneRequiredError + "')]",{visible:true, timeout: 10000});
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

describe("register - step 1 - password and confirm password do not match", ()=> {
  let registerpage = new RegisterPage();
  let name = "Bizzi test 999";
  let email = "bizzitesting999@mailinator.com";
  let phone = "0963170004";
  let password = "WbFzWnRJ4Qmp5kW";
  let confirmPassword = "WbFzWnRJ4Qmp5kE";
  let confirmPasswordError = "Nhập lại mật khẩu không chính xác";
  let browser;
  let page;
  beforeAll(async() => {
    jest.setTimeout(9999999);
    browser = await testsetup.testsetup();
    page = await browser.newPage();
    await page.goto(config.webapp.url);
    await registerpage.openRegisterForm(page);
  });
  afterAll(async() => {
    await browser.close();
  });
  test("register - password and confirm password do not match", async () => {
    let result = true;
    try{
      await registerpage.typeFullName(page, name);
      await registerpage.typeEmail(page, email);
      await registerpage.typePhone(page, phone);
      await registerpage.typePassword(page, password);
      await registerpage.typeConfirmPassword(page, confirmPassword);
      await registerpage.clickContinueButton(page);
      await page.waitForXPath("//*[contains(text(),'" + confirmPasswordError + "')]",{visible:true, timeout: 10000});
    }catch{
      result = false;
    }
    expect(result).toEqual(true);
  }, 10000);
})

describe("register - step 1 - email already exist", ()=> {
  let registerpage = new RegisterPage();
  let name = "Bizzi test 999";
  let email = config.webapp.user;
  let phone = "0963170004";
  let password = config.webapp.password;
  let confirmPassword = config.webapp.password;
  let emailError = "Email đã tồn tại!";
  let browser;
  let page;
  beforeAll(async() => {
    jest.setTimeout(999999);
    browser = await testsetup.testsetup();
    page = await browser.newPage();
    await page.goto(config.webapp.url);
    await registerpage.openRegisterForm(page);
  });
  afterAll(async() => {
    await browser.close();
  });
  test("register - email already exist", async () => {
    let result = true;
    try{
      await registerpage.typeFullName(page, name);
      await registerpage.typeEmail(page, email);
      await registerpage.typePhone(page, phone);
      await registerpage.typePassword(page, password);
      await registerpage.typeConfirmPassword(page, confirmPassword);
      await registerpage.clickContinueButton(page);
      await page.waitForXPath("//*[contains(text(),'" + emailError + "')]",{visible:true, timeout: 10000});
    }catch{
      result = false;
    }
    expect(result).toEqual(true);
  }, 10000);
})

describe("register - step 2 - required field is empty", ()=> {
  const util = require("../../libs/makeid");
  let registerpage = new RegisterPage();
  let name = "Bizzi test " + util.makeId(6);
  let email = "bizzitesting" + util.makeId(6) + "@mailinator.com";
  let phone = "0963170004";
  let password = config.webapp.password;
  let confirmPassword = config.webapp.password;
  let companyTypeRequiredError = "Vui lòng chọn loại hình doanh nghiệp";
  let companyNameRequiredError = "Vui lòng nhập tên công ty";
  let taxCodeRequiredError = "Vui lòng nhập mã số thuế";
  let addressRequiredError = "Vui lòng nhập địa chỉ";
  let invoiceEmailRequiredError = "Vui lòng nhập email nhận hoá đơn";
  let browser;
  let page;
  beforeAll(async() => {
    jest.setTimeout(999999);
    browser = await testsetup.testsetup();
    page = await browser.newPage();
    await page.goto(config.webapp.url);
    await registerpage.openRegisterForm(page);
    await registerpage.typeFullName(page, name);
    await registerpage.typeEmail(page, email);
    await registerpage.typePhone(page, phone);
    await registerpage.typePassword(page, password);
    await registerpage.typeConfirmPassword(page, confirmPassword);
  });
  afterAll(async() => {
    await browser.close();
  });
  test("register - company type is not selected", async () => {
    let result = true;
    try{
      await registerpage.clickContinueButton(page);
      await page.waitForNavigation({waitUntil: 'networkidle2'});
      await registerpage.clickStartButton(page);
      await page.waitForXPath("//*[contains(text(),'" + companyTypeRequiredError + "')]",{visible:true, timeout: 10000});
    }catch{
      result = false;
    }
    expect(result).toEqual(true);
  }, 10000);
  test("register - company name is empty", async () => {
    let result = true;
    try{
      await page.waitForXPath("//*[contains(text(),'" + companyNameRequiredError + "')]",{visible:true, timeout: 10000});
    }catch{
      result = false;
    }
    expect(result).toEqual(true);
  }, 10000);
  test("register - tax code is empty", async () => {
    let result = true;
    try{
      await page.waitForXPath("//*[contains(text(),'" + taxCodeRequiredError + "')]",{visible:true, timeout: 10000});
    }catch{
      result = false;
    }
    expect(result).toEqual(true);
  }, 10000);
  test("register - company address is empty", async () => {
    let result = true;
    try{
      await page.waitForXPath("//*[contains(text(),'" + addressRequiredError + "')]",{visible:true, timeout: 10000});
    }catch{
      result = false;
    }
    expect(result).toEqual(true);
  }, 10000);
  test("register - invoice email is empty", async () => {
    let result = true;
    try{
      await page.waitForXPath("//*[contains(text(),'" + invoiceEmailRequiredError + "')]",{visible:true, timeout: 10000});
    }catch{
      result = false;
    }
    expect(result).toEqual(true);
  }, 10000);
})