import puppeteer from "puppeteer";
import { newPage, close } from "../drivers/webdriver";
import { loadTalentnetConfig, testRunConfig } from "../variables/webconfig";

import * as loginPage from "../webPages/loginPage";
import * as companyInfoPage from "../webPages/companyInfoPage";
import * as expenseList from "../webPages/talentnet/expenseList";

describe("Spend web test - talentnet - expense report", ()=> {
    let page: puppeteer.Page;
    let expenseReportId: string;

    beforeAll(async()=> {
        page = await newPage();
    })

    afterAll(async()=> {
        await close();
    })

    test(loadTalentnetConfig().modUsername + " should login " + loadTalentnetConfig().url + " successfully ", async()=> {
        await page.goto(loadTalentnetConfig().url, {waitUntil: "networkidle2"});
        await loginPage.submitLogin(page, loadTalentnetConfig().modUsername, loadTalentnetConfig().modPassword);
    }, testRunConfig.testRunTimeout)

    test("company name should contain " + loadTalentnetConfig().companyName, async()=> {
        expect(await companyInfoPage.verifyCompanyName(page, loadTalentnetConfig().companyName)).toBeTruthy();
    }, testRunConfig.testRunTimeout)

    test("tax code should contain " + loadTalentnetConfig().taxCode, async()=> {
        expect(await companyInfoPage.verifyTaxCode(page, loadTalentnetConfig().taxCode)).toBeTruthy();
    }, testRunConfig.testRunTimeout)

    test("company address should contain " + loadTalentnetConfig().companyAddress, async()=> {
        expect(await companyInfoPage.verifyCompanyAddress(page, loadTalentnetConfig().companyAddress)).toBeTruthy();
    }, testRunConfig.testRunTimeout)

    test("invoice email should be " + loadTalentnetConfig().invoiceEmail, async()=> {
        expect(await companyInfoPage.verifyInvoiceEmail(page, loadTalentnetConfig().invoiceEmail)).toBeTruthy();
    }, testRunConfig.testRunTimeout)

    test("click company name - company id " + loadTalentnetConfig().companyId, async()=> {
        await companyInfoPage.clickCompanyName(page, loadTalentnetConfig().invoiceEmail, loadTalentnetConfig().companyName);
    }, testRunConfig.testRunTimeout)

    test("click valid invoice tab",async()=> {
        await expenseList.clickValidInvoiceStatusTab(page);
    }, testRunConfig.loadingTimeout)

    test("click filter button", async()=> {
        await expenseList.clickFilterButton(page);
    }, testRunConfig.testRunTimeout)

    test("load invoice id", async()=> {
        let expenseData = await expenseList.getExpenseData(page);
        expenseReportId = expenseData[0];
    }, testRunConfig.testRunTimeout)

    test("filter invoice id ", async()=> {
        await expenseList.filterInvoiceId(page, expenseReportId);
    }, testRunConfig.testRunTimeout)

    test("click invalid invoice tab", async()=> {
        await expenseList.clickInvalidInvoiceStatusTab(page);
    }, testRunConfig.testRunTimeout)

})