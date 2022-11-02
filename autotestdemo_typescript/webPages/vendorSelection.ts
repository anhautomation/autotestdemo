import puppeteer  from "puppeteer";
import { testRunConfig } from "../variables/webconfig";

let vendorSelectionListXpath = "//*[@class='ant-table-tbody']";
let nextButtonXpath = "//button[.//*[contains(text(),'Tiếp theo')]]";

export const selectFirstVendor = async (page:puppeteer.Page) => {
    let firstVendorXpath = vendorSelectionListXpath + "/tr[0]//input[@type='radio']";
    await page.waitForXPath(firstVendorXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let firstVendorRadioButton = await page.$x(firstVendorXpath);
    await firstVendorRadioButton[0].click;
}

export const clickNextButton = async (page:puppeteer.Page) => {
    await page.waitForXPath(nextButtonXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let nextButton = await page.$x(nextButtonXpath);
    await nextButton[0].click();
}