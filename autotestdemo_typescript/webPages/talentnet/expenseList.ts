import puppeteer from "puppeteer";
import {testRunConfig } from "../../variables/webconfig";

let validInvoiceTabXpath = "//*[contains(@data-menu-id,'valid-expense')]";
let invalidInvoiceTabXpath = "//*[contains(@data-menu-id,'invalid-expense')]";
let table = "//*[@class='ant-table-tbody']";
let filterButtonXpath = "//button[.//*[contains(text(), 'Lọc chi phí')]]";
let reportStatusDropdownXpath = "//*[@id='report_status']";
let invoiceIdInputXpath = "//*[@id='invoice_id']";
let expenseReportIdInputXpath = "//*[@id='expense_report_id']";
let eclaimRefInputXpath = "//*[@id='eclaim_ref']";
let expenseNameInputXpath = "//*[@id='note']";
let vatPeriodInputXpath = "//*[@id='vat_period']";
let searchButtonXpath = "//button[.//*[contains(text(),'Tìm kiếm')]]";

let expenseData: string[] = [];

export const clickValidInvoiceStatusTab = async (page:puppeteer.Page) => {
    await page.waitForXPath(validInvoiceTabXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let validInvoiceTab = await page.$x(validInvoiceTabXpath);
    await validInvoiceTab[0].click();
}

export const clickInvalidInvoiceStatusTab =async (page:puppeteer.Page) => {
    await page.waitForXPath(invalidInvoiceTabXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let invalidInvoiceTab = await page.$x(invalidInvoiceTabXpath);
    await invalidInvoiceTab[0].click();
}

export const clickFilterButton = async (page: puppeteer.Page) => {
    await page.waitForXPath(filterButtonXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let filterButton = await page.$x(filterButtonXpath);
    await filterButton[0].click();    
    await verifyReportStatusDropdown(page);
    await verifyInvoiceIdInput(page);
    await verifyExpenseReportIdInput(page);
    await verifyEclaimRefInput(page);
    await verifyExpenseNameInput(page);
    await verifyVatPeriodInput(page);
}

export const clickSearchButton = async (page:puppeteer.Page) => {
    try{
        await page.waitForXPath(searchButtonXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
        let searchButton = await page.$x(searchButtonXpath);
        await searchButton[0].click();
    }catch(err){
        console.error(searchButtonXpath);
    }
}

export const filterInvoiceId = async (page:puppeteer.Page, invoiceIdText: string) => {
    let invoiceIdInput = await page.$x(invoiceIdInputXpath);
    await invoiceIdInput[0].type(invoiceIdText);
    await clickSearchButton(page);
    await verifyDataTable(page);
}

export const getExpenseData = async (page:puppeteer.Page) => {
    let expenseDataRowXpath = table + "/tr[2]";
    let expenseDataColoumnXpath = expenseDataRowXpath + "/td";
    await page.waitForXPath(expenseDataColoumnXpath,{visible:true, timeout: testRunConfig.loadingTimeout});
    let expenseDataColoumnElement = await page.$x(expenseDataColoumnXpath);
    let columnCount = await expenseDataColoumnElement.length;
    for(let i = 1; i <= columnCount; i++){
        let expenseDataCellXpath =  expenseDataColoumnXpath + "[" + i + "]";
        let expenseDataCellElement = await page.$x(expenseDataCellXpath);
        let cellValue = String(await (await expenseDataCellElement[0].getProperty("textContent")).jsonValue());
        expenseData.push(cellValue);
    }
    return expenseData
}

const verifyDataTable = async (page:puppeteer.Page) => {
    let expenseDataRowXpath = table + "/tr[2]";
    try{
        await page.waitForXPath(expenseDataRowXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    }catch(err){
        console.error(expenseDataRowXpath);
    }
}

const verifyReportStatusDropdown = async (page:puppeteer.Page) => {
    try{
        await page.waitForXPath(reportStatusDropdownXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    }catch(err){
        console.error(reportStatusDropdownXpath);
    }
}

const verifyInvoiceIdInput = async (page:puppeteer.Page) => {
    try{
        await page.waitForXPath(invoiceIdInputXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    }catch(err){
        console.error(invoiceIdInputXpath);
    }
}

const verifyExpenseReportIdInput = async (page:puppeteer.Page) => {
    try{
        await page.waitForXPath(expenseReportIdInputXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    }catch(err){
        console.error(expenseReportIdInputXpath);
    }
}

const verifyEclaimRefInput = async (page:puppeteer.Page) => {
    try{
        await page.waitForXPath(eclaimRefInputXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    }catch(err){
        console.error(eclaimRefInputXpath);
    }
}

const verifyExpenseNameInput = async (page:puppeteer.Page) => {
    try{
        await page.waitForXPath(expenseNameInputXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    }catch(err){
        console.error(expenseNameInputXpath);
    }
}

const verifyVatPeriodInput = async (page:puppeteer.Page) => {
    try{
        await page.waitForXPath(vatPeriodInputXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    }catch(err){
        console.error(vatPeriodInputXpath);
    }
}