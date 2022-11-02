import puppeteer from "puppeteer";
import { testRunConfig } from "../variables/webconfig";

let transferPurposeXpath = "//*[./*[contains(text(),'Mục đích thanh toán')]]/following-sibling::textarea";
let transferContentXpath = "//*[./*[contains(text(),'Nội dung chuyển khoản')]]/following-sibling::textarea";
let nextButtonXpath = "//button[.//*[contains(text(),'Tiếp theo')]]";

export const InputTransferPurpose =async (page:puppeteer.Page, text: string) => {
    await page.waitForXPath(transferPurposeXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let transferPurposeElement = await page.$x(transferPurposeXpath);
    await transferPurposeElement[0].type(text);
}

export const InputTransferContent = async (page:puppeteer.Page, text: string) => {
    await page.waitForXPath(transferContentXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let transferContentElement = await page.$x(transferContentXpath);
    await transferContentElement[0].type(text);
}

export const clickNextButton = async (page:puppeteer.Page) => {
    await page.waitForXPath(nextButtonXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let nextButton = await page.$x(nextButtonXpath);
    await nextButton[0].click();
}