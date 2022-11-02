import puppeteer from "puppeteer";
import { newPage, close, handback } from "../drivers/webdriver";
import { loadExpenseConfig, loadMondelezConfig, testRunConfig } from "../variables/webconfig";

import * as loginPage from "../webPages/loginPage";
import * as companyInfoPage from "../webPages/companyInfoPage";

describe.each([
    [loadExpenseConfig().url, loadExpenseConfig().modUsername, loadExpenseConfig().modPassword, loadExpenseConfig().companyId, loadExpenseConfig().companyName, loadExpenseConfig().companyAddress, loadExpenseConfig().taxCode, loadExpenseConfig().invoiceEmail],
    [loadMondelezConfig().url, loadMondelezConfig().modUsername, loadMondelezConfig().modPassword, loadMondelezConfig().companyId, loadMondelezConfig().companyName, loadMondelezConfig().companyAddress, loadMondelezConfig().taxCode, loadMondelezConfig().invoiceEmail]
])("Web - company info tests  - %s",(url, modUsername, modPassword, companyId, companyName, companyAddress, taxCode, invoiceEmail)=> {
    let page: puppeteer.Page;

    beforeAll(async()=> {
        page = await newPage();
    }, testRunConfig.testRunTimeout);

    afterAll(async()=> {
        await close();
    }, testRunConfig.testRunTimeout);

    test(modUsername + " should login " + url + " successfully ", async()=> {
        await page.goto(url, {waitUntil: "networkidle2"});
        await loginPage.submitLogin(page, modUsername, modPassword);
    }, testRunConfig.testRunTimeout)

    test("company name should contain " + companyName, async() => {
        expect(await companyInfoPage.verifyCompanyName(page, companyName)).toBeTruthy();
    }, testRunConfig.testRunTimeout)

    test("tax code should contain " + taxCode, async() => {
        expect(await companyInfoPage.verifyTaxCode(page, taxCode)).toBeTruthy();
    }, testRunConfig.testRunTimeout)

    test("company address should contain " + companyAddress, async () => {
        expect(await companyInfoPage.verifyCompanyAddress(page, companyAddress)).toBeTruthy();
    }, testRunConfig.testRunTimeout)

    test("invoice email should be " + invoiceEmail, async () => {
        expect(await companyInfoPage.verifyInvoiceEmail(page, invoiceEmail)).toBeTruthy();
    }, testRunConfig.testRunTimeout)

    test("click company name - company id " + companyId, async () => {
        await companyInfoPage.clickCompanyName(page, invoiceEmail, companyName);
    }, testRunConfig.testRunTimeout)

})