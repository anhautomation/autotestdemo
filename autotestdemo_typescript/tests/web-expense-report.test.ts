import puppeteer from "puppeteer";
import { newPage, close } from "../drivers/webdriver";
import { loadExpenseConfig, loadMondelezConfig, testRunConfig } from "../variables/webconfig";

import * as loginPage from "../webPages/loginPage";
import * as companyInfoPage from "../webPages/companyInfoPage";
import * as sideMenu from "../webPages/sideMenu";
import * as expenseReportPage from "../webPages/expenseReportPage";

describe.each([
    [loadExpenseConfig().url, loadExpenseConfig().modUsername, loadExpenseConfig().modPassword, loadExpenseConfig().invoiceEmail, loadExpenseConfig().companyName],
    [loadMondelezConfig().url, loadMondelezConfig().modUsername, loadMondelezConfig().modPassword, loadMondelezConfig().invoiceEmail, loadMondelezConfig().companyName]
])("Web - expense report tests - %s", (url, modUsername, modPassword, invoiceEmail, companyName)=>{
    let page: puppeteer.Page;

    beforeAll(async () => {
        page = await newPage();
        await page.goto(url, {waitUntil: "networkidle2"});
        await loginPage.submitLogin(page, modUsername, modPassword);
        await companyInfoPage.clickCompanyName(page, invoiceEmail, companyName);
    }, testRunConfig.testRunTimeout)

    afterAll(async () => {
        await close();
    }, testRunConfig.testRunTimeout)

    test("click expense report", async () => {
        await sideMenu.clickExpenseReportLink(page);
    }, testRunConfig.testRunTimeout)

    test("click waiting tab", async () => {
        await expenseReportPage.clickWaitingTab(page);
    }, testRunConfig.testRunTimeout)

    test("click approve tab", async () => {
        await expenseReportPage.clickApproveTab(page);
    }, testRunConfig.testRunTimeout)

    test("click all tab", async () => {
        await expenseReportPage.clickAllTab(page);
    }, testRunConfig.testRunTimeout)
})