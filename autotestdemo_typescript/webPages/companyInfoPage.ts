import puppeteer from "puppeteer";
import { testRunConfig } from "../variables/webconfig";

let tableXpath = "//*[@class='ant-table-tbody']";

export const verifyCompanyName = async(page: puppeteer.Page, companyName: string) =>{
    let companyNameLinkXpath = "//*[@class='ant-typography']//a[contains(@class,'company-name') and contains(text(),'" + companyName + "')]";
    try{
        await page.waitForXPath(companyNameLinkXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
        return true;
    }catch(err){
        console.error(companyNameLinkXpath);
        return false;
    }
}

export const verifyTaxCode = async(page: puppeteer.Page, taxCode: string) =>{
    let taxCodeXpath = "//*[@class='company__detail']//*[contains(@class,'company-tax-code')]//*[contains(text(),'" + taxCode + "')]";
    try{
        await page.waitForXPath(taxCodeXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
        return true;
    }catch(err){
        console.error(taxCodeXpath);
        return false;
    }
}

export const verifyCompanyAddress = async(page: puppeteer.Page, companyAddress: string) =>{
    let companyAddressXpath = "//*[@class='company__detail']//*[contains(@class,'company-address') and contains(text(),'" + companyAddress + "')]";
    try{
        await page.waitForXPath(companyAddressXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
        return true;
    }catch(err){
        console.error(companyAddressXpath);
        return false;
    }
}

export const verifyInvoiceEmail = async (page: puppeteer.Page, invoiceEmail: string) => {
    let invoiceEmailXpath = "//*[@class='ant-table-cell']//a[contains(text(),'" + invoiceEmail + "')]";
    try{
        await page.waitForXPath(invoiceEmailXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
        return true;
    }catch(err){
        console.error(invoiceEmailXpath);
        return false;
    }
}

export const clickCompanyName = async (page: puppeteer.Page, invoiceEmail: string, companyName: string) => {
    await page.waitForXPath(tableXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let tableRowCount = await (await page.$x(tableXpath + "//tr")).length;
    let companyNameLinkXpath = tableXpath;
    for(let i = 1; i <= tableRowCount; i++){
        let invoiceEmailXpath = tableXpath + "//tr[" + i + "]/td/a";
        await page.waitForXPath(invoiceEmailXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
        let invoiceEmailElement = await page.$x(invoiceEmailXpath);
        let invoiceEmailText = await (await invoiceEmailElement[0].getProperty("textContent")).jsonValue();
        if(invoiceEmailText === invoiceEmail){
            companyNameLinkXpath = companyNameLinkXpath + "//tr[" + i + "]" + "//*[@class='ant-typography']//a[contains(@class,'company-name') and contains(text(),'" + companyName + "')]";
            break;
        }
    }
    let companyNameLink = await page.$x(companyNameLinkXpath);
    await companyNameLink[0].click();
    // await page.waitForNavigation({waitUntil: 'networkidle2'});
}
