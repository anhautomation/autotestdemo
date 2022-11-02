import puppeteer from "puppeteer";
import { testRunConfig  } from "../variables/webconfig";

let requestPageXpath = "//*[@class='RequestList_requestList__GZJ6t']";
let waitingStatusXpath = requestPageXpath + "//*[contains(text(),'Chờ duyệt')]";
let approveStatusXpath = requestPageXpath + "//*[contains(text(),'Đã duyệt')]";
let allStatusXpath = requestPageXpath + "//*[contains(text(),'Tất cả')]";
let requestTableXpath = requestPageXpath + "//*[@class='ant-table-tbody']";
let pageSizeDropdownXpath = requestPageXpath + "//*[@class='ant-select-selector']";

export const clickWaitingStatus = async (page:puppeteer.Page) => {
    await page.waitForXPath(waitingStatusXpath,{visible:true, timeout: testRunConfig.loadingTimeout});
    let waitingStatusElement = await page.$x(waitingStatusXpath);
    await waitingStatusElement[0].click();
}

export const clickApproveStatus = async (page:puppeteer.Page) => {
    await page.waitForXPath(approveStatusXpath,{visible:true, timeout: testRunConfig.loadingTimeout});
    let approveStatusElement = await page.$x(approveStatusXpath);
    await approveStatusElement[0].click();
}

export const clickAllStatus = async (page:puppeteer.Page) => {
    await page.waitForXPath(allStatusXpath,{visible:true, timeout: testRunConfig.loadingTimeout});
    let allStatusElement = await page.$x(allStatusXpath);
    await allStatusElement[0].click();
}

export const clickPageSizeDropdown = async (page:puppeteer.Page) => {
    await page.waitForXPath(pageSizeDropdownXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let pageSizeDropdown = await page.$x(pageSizeDropdownXpath);
    await pageSizeDropdown[0].click();
}

export const clickPageSizeOption =async (page:puppeteer.Page, pageSize: number) => {
    let pageSizePerPageXpath = requestPageXpath + "//*[@role='listbox']//*[contains(text(),'" + pageSize + " / trang')]";
    await page.waitForXPath(pageSizePerPageXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let pageSizePerPageElement = await page.$x(pageSizePerPageXpath);
    await pageSizePerPageElement[0].click();
    await page.waitForNavigation({waitUntil:"networkidle2"});
}

export const verifyRequestTable = async (page:puppeteer.Page) => {
    await page.waitForXPath(requestTableXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let requestRecordXpath = requestTableXpath + "/tr/td";
    await page.waitForXPath(requestRecordXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let requestRecordElement = await page.$x(requestRecordXpath);
    return requestRecordElement.length;
}