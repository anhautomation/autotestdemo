import puppeteer, { Page } from "puppeteer";
import { testRunConfig } from "../variables/webconfig";

import * as purchaseInvoicePage  from "./purchaseInvoicePage";
import * as expenseReportPage from "./expenseReportPage";
import * as saleInvoicePage from "./saleInvoicePage";
import * as emailPage from "./emailPage";
import * as vendorPage from "./vendorPage";
import * as expensePoliciesPage from "./expensePoliciesPage";
import * as expenseCategoriesPage from "./expenseCategoriesPage";
import * as expenseApprovalFlowPage from "./expenseApprovalFlowPage";

let sideMenuXpath = "//*[@class='space-between-vertical']";
let paymentXpath = sideMenuXpath + "//*[@role='menuitem' and .//*[contains(text(),'Thanh toán')]]";

// invoice in tab - invoice subtab - request report subtab - expense report subtab
let invoiceInXpath = sideMenuXpath + "//*[@role='menuitem' and .//*[contains(text(),'Chi phí đầu vào')]]";
let invoiceXpath = sideMenuXpath + "//*[@class='center-vertical' and .//*[contains(text(),'Hóa đơn') and not(contains(text(),'Hóa đơn '))]]";
let expenseRequestXpath = sideMenuXpath + "//*[@class='center-vertical' and .//*[contains(text(),'Yêu cầu chi tiêu')]]";
let expenseReportXpath = sideMenuXpath + "//*[@class='center-vertical' and .//*[contains(text(),'Đề nghị thanh toán')]]";

// invoice out tab
let invoiceOutXpath = sideMenuXpath + "//*[@role='menuitem' and .//*[contains(text(),'Hóa đơn bán ra')]]";

// email tab
let emailXpath = sideMenuXpath + "//*[@role='menuitem' and .//*[contains(text(),'Hộp thư')]]";

// vendor tab
let supplierXpath = sideMenuXpath + "//*[@role='menuitem' and .//*[contains(text(),'Nhà cung cấp')]]";

// expense policy tab - policy subtab - expense category subtab - approval flow subtab
let expensePolicyXpath = sideMenuXpath + "//*[@role='menuitem' and .//*[contains(text(),'Chính sách chi tiêu')]]";
let policyXpath = sideMenuXpath + "//*[@class='center-vertical' and .//*[contains(text(),'Chính sách')]]";
let expenseCategoryXpath = sideMenuXpath + "//*[@class='center-vertical' and .//*[contains(text(),'Danh mục chi tiêu')]]";
let approvalFlowXpath = sideMenuXpath + "//*[@class='center-vertical' and .//*[contains(text(),'Quy trình duyệt')]]";

let paymentRequestListXpath = sideMenuXpath + "//*[@class='center-vertical' and .//*[contains(text(),'Yêu cầu thanh toán')]]";
let bankAccountListXpath = sideMenuXpath + "//*[@class='center-vertical' and .//*[contains(text(),'Tài khoản ngân hàng')]]";

/**
 * invoice in tab
 * @param page 
 */
const clickInvoiceInTab =async (page:puppeteer.Page) => {
    await hoverSideMenu(page);
    await page.waitForXPath(invoiceInXpath, {visible: true, timeout: testRunConfig.loadingTimeout}); 
    let invoiceInElement = await page.$x(invoiceInXpath);
    await invoiceInElement[0].click();
    await delay(5000);
}

/**
 * invoice in tab - invoice subtab
 * @param page 
 */
export const clickInvoiceLink =async(page:puppeteer.Page) => {
    await clickInvoiceInTab(page);
    await page.waitForXPath(invoiceXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let invoiceLink = await page.$x(invoiceXpath);
    await invoiceLink[0].click();
    await page.waitForXPath(purchaseInvoicePage.addNewInvoiceXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
}

/**
 * invoice in tab - request report subtab
 * @param page 
 */
export const clickRequestReportLink =async (page:puppeteer.Page) => {
    await clickInvoiceInTab(page);
    await page.waitForXPath(expenseRequestXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let expenseRequestLink = await page.$x(expenseRequestXpath);
    await expenseRequestLink[0].click();
}

/**
 * invoice in tab - expense report subtab
 * @param page 
 */
export const clickExpenseReportLink = async (page: puppeteer.Page) => {
    await clickInvoiceInTab(page);
    await page.waitForXPath(expenseReportXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let expenseReportLink = await page.$x(expenseReportXpath);
    await expenseReportLink[0].click();
    await page.waitForXPath(expenseReportPage.filterXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
}

/**
 * invoice out tab
 * @param page 
 */
export const clickInvoiceOutTab = async (page: puppeteer.Page) => {
    await hoverSideMenu(page);
    await page.waitForXPath(invoiceOutXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let invoiceOutElemet = await page.$x(invoiceOutXpath);
    await invoiceOutElemet[0].click();
    await page.waitForXPath(saleInvoicePage.addNewInvoiceXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
}

/**
 * email tab
 * @param page 
 */
export const clickEmailTab = async(page: puppeteer.Page) => {
    await hoverSideMenu(page);
    await page.waitForXPath(emailXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let emailElement = await page.$x(emailXpath);
    await emailElement[0].click();
    await page.waitForXPath(emailPage.filterXpath,{visible:true, timeout: testRunConfig.loadingTimeout});
}

/**
 * supplier tab
 * @param page 
 */
export const clickSupplierTab =async (page:puppeteer.Page) => {
    await hoverSideMenu(page);
    await page.waitForXPath(supplierXpath,{visible:true,timeout: testRunConfig.loadingTimeout});
    let supplierElement = await page.$x(supplierXpath);
    await supplierElement[0].click();
    await page.waitForXPath(vendorPage.createXpath,{visible:true, timeout: testRunConfig.loadingTimeout});
}

/**
 * expense policy tab
 * @param page 
 */
const clickExpensePolicyTab = async (page:puppeteer.Page) => {
    await hoverSideMenu(page);
    await page.waitForXPath(expensePolicyXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let expensePolicyElement = await page.$x(expensePolicyXpath);
    await expensePolicyElement[0].click();
    await delay(5000);
}

export const clickPolicyLink = async (page:puppeteer.Page) => {
    await clickExpensePolicyTab(page);
    await page.waitForXPath(policyXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let policyLink = await page.$x(policyXpath);
    await policyLink[0].click();
    await page.waitForXPath(expensePoliciesPage.filterXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
}

export const clickExpenseCategoryLink = async (page:puppeteer.Page) => {
    await clickExpensePolicyTab(page);
    await page.waitForXPath(expenseCategoryXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let expenseCategoryLink = await page.$x(expenseCategoryXpath);
    await expenseCategoryLink[0].click();
    await page.waitForXPath(expenseCategoriesPage.addCategoryButtonXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
}

export const clickApprovalFlowLink = async (page:puppeteer.Page) => {
    await clickExpensePolicyTab(page);
    await page.waitForXPath(approvalFlowXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let approvalFlowLink = await page.$x(approvalFlowXpath);
    await approvalFlowLink[0].click();
    await page.waitForXPath(expenseApprovalFlowPage.expenseRequestTabXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
}

/**
 * payment tab
 * @param page 
 */
export const clickPaymentTab = async (page:puppeteer.Page) => {
    await page.waitForXPath(paymentXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let paymentElement = await page.$x(paymentXpath);
    await paymentElement[0].click();
}

export const clickPaymentRequestListLink = async (page:puppeteer.Page) => {
    await page.waitForXPath(paymentRequestListXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let paymentRequestListLink = await page.$x(paymentRequestListXpath);
    await paymentRequestListLink[0].click();
}

export const clickBankAccountListLink = async (page:puppeteer.Page) => {
    await page.waitForXPath(bankAccountListXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let bankAccountListLink = await page.$x(bankAccountListXpath);
    await bankAccountListLink[0].click();
}

/* ========================================================= */ 
const hoverSideMenu = async (page:puppeteer.Page) => {
    await page.waitForXPath(sideMenuXpath, {visible: true, timeout: testRunConfig.loadingTimeout});
    let sideMenuElement = await page.$x(sideMenuXpath);
    await sideMenuElement[0].hover();
    await delay(5000);
}

let delay = async(time: number) =>{
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}