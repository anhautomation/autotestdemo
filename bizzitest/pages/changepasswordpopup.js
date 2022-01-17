const puppeteer = require('puppeteer');
     
class ChangePasswordPopup  {
    async typeCurrentPassword(page, text) {
        let passwordXpath = "//input[@id='old_password']";
        await page.waitForXPath(passwordXpath, {visible: true, timeout: 10000});
        let currentPassword = await page.$x(passwordXpath);
        await currentPassword[0].type(text);
    }
    async typeNewPassword(page, text) {
        let passwordXpath = "//input[@id='new_password']";
        await page.waitForXPath(passwordXpath, {visible: true, timeout: 10000});
        let newPassword = await page.$x(passwordXpath);
        await newPassword[0].type(text);
    }
    async typeConfirmNewPassword(page, text) {
        let passwordXpath = "//input[@id='confirm_new_password']";
        await page.waitForXPath(passwordXpath, {visible: true, timeout: 10000});
        let confirmPassword = await page.$x(passwordXpath);
        await confirmPassword[0].type(text);
    }
    async clickUpdate(page) {
        let updateXpath = "//button[./*[contains(text(),'Cập nhật')]]";
        await page.waitForXPath(updateXpath, {visible: true, timeout: 10000});
        let updateButton = await page.$x(updateXpath);
        await updateButton[0].click();
    }
    async clickClose(page){
        let closeXpath = "//button[./*[contains(text(),'Đóng')]]";
        await page.waitForXPath(closeXpath, {visible: true, timeout: 10000});
        let closeButton = await page.$x(closeXpath);
        await closeButton[0].click();
    }

}
    
module.exports = ChangePasswordPopup;