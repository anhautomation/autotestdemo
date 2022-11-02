import puppeteer from "puppeteer";
import { testRunConfig } from "../variables/webconfig";

let headerXpath = "//header[@class='ant-layout-header']";
let languageXpath = headerXpath + "//*[@type='flex']//*[@class='ant-col']/div";
let vietnameseLanguageXpath = "//*[@role='menuitem' and .//*[contains(text(),'Tiếng việt')]]";

export const selectVietnameLanguage = async (page:puppeteer.Page) => {
    await page.waitForXPath(languageXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let languageElement = await page.$x(languageXpath);
    await languageElement[0].hover();
    await page.waitForXPath(vietnameseLanguageXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let vietnameseLanguageElement = await page.$x(vietnameseLanguageXpath);
    await vietnameseLanguageElement[0].click();
}