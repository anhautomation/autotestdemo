const puppeteer = require('puppeteer');
     
class RegisterPage  {
    async openRegisterForm(page) {
        let registerXpath = "//a[contains(text(),'Đăng ký tài khoản')]";
        await page.waitForXPath(registerXpath, {visible: true, timeout: 10000});
        let registerLink = await page.$x(registerXpath);
        await registerLink[0].click();
    }
    async typeFullName(page,text) {
        let nameXpath = "//input[@id='fullname']";
        await page.waitForXPath(nameXpath, {visible: true, timeout: 10000});
        let name = await page.$x(nameXpath);
        await name[0].type(text);
    }
    async typeEmail(page, text) {
        let email = await page.$x("//input[@id='email']");
        await email[0].type(text);
    }
    async typePhone(page, text) {
        let phone = await page.$x("//input[@id='phone']");
        await phone[0].type(text);
    }
    async typePassword(page, text) {
        let password = await page.$x("//input[@id='password']");
        await password[0].type(text);
    }
    async typeConfirmPassword(page, text) {
        let confirmPassword = await page.$x("//input[@id='confirm']");
        await confirmPassword[0].type(text);
    }
    async clickContinueButton(page) {
        let continueButtonXpath = "//button[./*[contains(text(),'Tiếp tục')]]";
        await page.waitForXPath(continueButtonXpath, {visible: true, timeout: 5000});
        let continueButton = await page.$x(continueButtonXpath);
        await continueButton[0].click();
    }
    async selectCompanyType(page, text){
        let companyTypeXpath = "//*[./*[contains(text(),'" + text + "')]]";
        await page.waitForXPath(companyTypeXpath,{visible: true, timeout: 10000});
        let companyType = await page.$x(companyTypeXpath);
        await companyType[0].click();
    }
    async typeCompanyName(page,text){
        let companyName = await page.$x("//input[@id='name']");
        await companyName[0].type(text);
    }
    async typeTaxCode(page,text){
        let taxCode = await page.$x("//input[@id='tax_code']");
        await taxCode[0].type(text);
    }
    async typeCompanyAddress(page,text){
        let companyAddress = await page.$x("//input[@id='address']");
        await companyAddress[0].type(text);
    }
    async typeInvoiceEmail(page,text){
        let invoiceEmail = await page.$x("//input[@id='invoice_email']");
        await invoiceEmail[0].type(text);
    }
    async clickStartButton(page) {
        let startButtonXpath = "//button[./*[contains(text(),'Bắt đầu ngay')]]";
        await page.waitForXPath(startButtonXpath, {visible: true, timeout: 10000});
        let startButton = await page.$x(startButtonXpath);
        await startButton[0].click();
    }
}
    
module.exports = RegisterPage;