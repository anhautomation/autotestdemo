import puppeteer from "puppeteer";
import { testRunConfig } from "../variables/webconfig";

export const getCellText =async (page:puppeteer.Page, tableXpath: string, row: number, col: number) => {
    let tableCellXpath = tableXpath + "/tr[" + row + "]/td[" + col + "]";
    await page.waitForXPath(tableCellXpath,{visible:true, timeout: testRunConfig.loadingTimeout});
    let tableCell = await page.$x(tableCellXpath);
    let actualText= await (await tableCell[0].getProperty('textContent')).jsonValue();
    return String(actualText);
}