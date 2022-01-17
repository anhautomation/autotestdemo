const puppeteer = require('puppeteer');
     
class LoginPage  {
    async typeUserName(page, text) {
        let usernameXpath = "//input[@id='username']"
        await page.waitForXPath(usernameXpath, {visible: true, timeout: 10000});
        let userName = await page.$x(usernameXpath);
        await userName[0].type(text);
    }
    async typePassword(page, text) {
        let password = await page.$x("//input[@id='password']");
        await password[0].type(text);
    }
    async clickSubmit(page) {
        let submitButtonXpath = "//button[./*[contains(text(),'Đăng nhập')]]"
        await page.waitForXPath(submitButtonXpath, {visible: true, timeout: 10000});
        let submitButton = await page.$x(submitButtonXpath);
        await submitButton[0].click();
    }
}
    
module.exports = LoginPage;