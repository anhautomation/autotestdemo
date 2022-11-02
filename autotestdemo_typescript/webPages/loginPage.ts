import puppeteer from "puppeteer";
import { testRunConfig } from "../variables/webconfig";

let usernameXpath = "//*[@id='username']";
let passwordXpath = "//*[@id='password']";
let submitXpath = "//*[@type='submit']";

export const typeUsername = async(page: puppeteer.Page, text: string) =>{
    await page.waitForXPath(usernameXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let usernameInput = await page.$x(usernameXpath);
    await usernameInput[0].type(text);
}

export const typePassword = async(page: puppeteer.Page, text: string) => {
    await page.waitForXPath(passwordXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let passwordInput = await page.$x(passwordXpath);
    await passwordInput[0].type(text);
}

export const clickSubmit = async(page: puppeteer.Page) => {
    await page.waitForXPath(submitXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let submitButton = await page.$x(submitXpath);
    await submitButton[0].click();
    await page.waitForXPath("//*[contains(text(),'Xin chào')]",{visible: true, timeout: testRunConfig.loadingTimeout});
}

export const submitLogin =async (page:puppeteer.Page, username: string, password: string) => {
    await typeUsername(page, username);
    await typePassword(page, password);
    await clickSubmit(page);
}