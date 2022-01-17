const puppeteer = require("puppeteer");
const testsetup = require("../../testsetup");
const config = require("../../config/bizzi_config");
const RegisterPage = require("../../pages/registerpage");
const LoginPage = require("../../pages/loginpage");
const CompanyListPage = require("../../pages/companylistpage");
const ChangePasswordPopup = require("../../pages/changepasswordpopup");

describe("change password - failed case", ()=> {
  let loginPage = new LoginPage();
  let companyListPage = new CompanyListPage();
  let changepasswordPopup = new ChangePasswordPopup();
  let browser;
  let page;
  beforeEach(async() => {
    jest.setTimeout(9999999);
    browser = await testsetup.testsetup();
    page = await browser.newPage();
    await page.goto(config.webapp.url);
    await loginPage.typeUserName(page, config.webapp.user);
    await loginPage.typePassword(page, config.webapp.password);
    await loginPage.clickSubmit(page);
  });
  afterEach(async() => {
    await browser.close();
  });
  test("new password must be different from previous password", async () => {
    let result = true;
    let passwordError = "Mật khẩu mới không được trùng với mật khẩu trước đó.";
    let newPassword = config.webapp.password;

    try{
        await page.waitForNavigation({ waitUntil: 'networkidle0'});
        await page.waitForXPath("//*[contains(text(),'Danh sách công ty')]",{visible:true, timeout: 50000});
        companyListPage.openChangePasswordPopup(page);
        await page.waitFor(2000);
        await changepasswordPopup.typeCurrentPassword(page, config.webapp.password);
        await changepasswordPopup.typeNewPassword(page, newPassword);
        await changepasswordPopup.typeConfirmNewPassword(page, newPassword);
        await changepasswordPopup.clickUpdate(page);
        await page.waitForXPath("//*[contains(text(),'" + passwordError + "')]",{visible:true, timeout: 10000});

    }catch(err){
      console.log(err);
      result = false;
    }
    expect(result).toEqual(true);
  }, 100000);

  test("change password successfully and must be signout", async () => {
    let result = true;
    let successfulMessage = "Đã thay đổi mật khẩu thành công.";
    let newPassword = config.webapp.password;

    try{
        await page.waitForNavigation({ waitUntil: 'networkidle0'});
        await page.waitForXPath("//*[contains(text(),'Danh sách công ty')]",{visible:true, timeout: 50000});
        companyListPage.openChangePasswordPopup(page);
        await page.waitFor(2000);
        await changepasswordPopup.typeCurrentPassword(page, config.webapp.password);
        await changepasswordPopup.typeNewPassword(page, newPassword);
        await changepasswordPopup.typeConfirmNewPassword(page, newPassword);
        await changepasswordPopup.clickUpdate(page);
        await page.waitForXPath("//*[contains(text(),'Đăng Nhập')]",{visible:true, timeout: 10000});

    }catch(err){
        console.log(err);
        result = false;
    }
    expect(result).toEqual(true);
  }, 100000);
})

describe("register successfully", ()=> {
  const util = require("../../libs/makeid");
  let registerpage = new RegisterPage();
  let name = "Bizzi test " + util.makeId(6);
  let email = "bizzitesting" + util.makeId(6) + "@mailinator.com";
  let phone = "0963170004";
  let password = config.webapp.password;
  let confirmPassword = config.webapp.password;
  let companyType = "Là doanh nghiệp";
  let taxCode = "1234567890";
  let companyAddress = util.makeId(9);
  let invoiceEmail = util.makeId(9);

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
  test("register successfully", async () => {
    let result = true;
    try{
      await registerpage.openRegisterForm(page);
      await registerpage.typeFullName(page, name);
      await registerpage.typeEmail(page, email);
      await registerpage.typePhone(page, phone);
      await registerpage.typePassword(page, password);
      await registerpage.typeConfirmPassword(page, confirmPassword);
      await registerpage.clickContinueButton(page);
      await page.waitForNavigation({waitUntil: "networkidle2"});
      await registerpage.selectCompanyType(page, companyType);
      await registerpage.typeCompanyName(page, name);
      await registerpage.typeTaxCode(page, taxCode);
      await registerpage.typeCompanyAddress(page, companyAddress);
      await registerpage.typeInvoiceEmail(page, invoiceEmail);
      await registerpage.clickStartButton(page);
      await page.waitForNavigation({waitUntil: "networkidle2"});
      await page.waitForXPath("//*[contains(text(),'Cách Bizzi Hoạt Động')]",{visible:true, timeout: 50000});
      let button = await page.$x("//button[./*[contains(text(),'BẮT ĐẦU NGAY')]]");
      button[0].click();
      await page.waitForXPath("//*[contains(text(),'Đăng Nhập')]",{visible:true, timeout: 10000});     
    }catch(err){
      console.log(err);
      result = false;
    }
    expect(result).toEqual(true);
  }, 300000);
  
})
    
  