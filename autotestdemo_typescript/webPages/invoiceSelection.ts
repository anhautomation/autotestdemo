import puppeteer from "puppeteer";
import { testRunConfig } from "../variables/webconfig";

let invoiceSelectionListXpath = "//*[@class='ant-table-tbody']";
let nextButtonXpath = "//button[.//*[contains(text(),'Tiếp theo')]]";

export const selectFirstInvoice = async (page:puppeteer.Page) => {
    let firstInvoiceXpath = invoiceSelectionListXpath + "/tr[0]//input[@type='checkbox']";
    await page.waitForXPath(firstInvoiceXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let firstInvoiceSelectbox = await page.$x(firstInvoiceXpath);
    await firstInvoiceSelectbox[0].click;
}

export const clickNextButton = async (page:puppeteer.Page) => {
    await page.waitForXPath(nextButtonXpath,{visible:true, timeout:testRunConfig.loadingTimeout});
    let nextButton = await page.$x(nextButtonXpath);
    await nextButton[0].click();
}