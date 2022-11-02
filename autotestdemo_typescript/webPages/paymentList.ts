import puppeteer from "puppeteer";
import { testRunConfig } from "../variables/webconfig";

let newRequestXpath = "//*[@class='flex-end' and .//*[contains(text(),'Tạo yêu cầu')]]";

export const clickNewRequestButton =async (page:puppeteer.Page) => {
    await page.waitForXPath(newRequestXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let newRequestButton = await page.$x(newRequestXpath);
    await newRequestButton[0].click();
}