const puppeteer = require("puppeteer");
const testsetup = require("../../testsetup");
const config = require("../../config/bizzi_config");
const RegisterPage = require("../../pages/registerpage");

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

      }catch(err){
        console.log(err);
        result = false;
      }
      expect(result).toEqual(true);
    }, 300000);
    
})