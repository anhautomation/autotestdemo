import puppeteer from "puppeteer";
import { newPage, close } from "../drivers/webdriver";
import { loadExpenseConfig, loadMondelezConfig, testRunConfig } from "../variables/webconfig";
import { defaultExpenseCategories } from "../variables/defaultExpenseCategories";

import * as loginPage from "../webPages/loginPage";
import * as companyInfoPage from "../webPages/companyInfoPage";
import * as sideMenu from "../webPages/sideMenu";
import * as expenseCategoryPage from "../webPages/expenseCategoriesPage";

describe.each([
    [loadExpenseConfig().url, loadExpenseConfig().modUsername, loadExpenseConfig().modPassword, loadExpenseConfig().invoiceEmail, loadExpenseConfig().companyName]
])("Web - expense category tests - %s", (url, modUsername, modPassword, invoiceEmail, companyName)=>{
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

    test("click expense category tab", async () => {
        await sideMenu.clickExpenseCategoryLink(page);
    }, testRunConfig.testRunTimeout)

    test("verify expense category: " + defaultExpenseCategories[0][0] + " - " + defaultExpenseCategories[0][1], async () => {
        expect(await expenseCategoryPage.verifyExpenseCategory(page, defaultExpenseCategories[0][0], defaultExpenseCategories[0][1])).toBeTruthy();
    }, testRunConfig.testRunTimeout)

    test("verify expense category: " + defaultExpenseCategories[1][0] + " - " + defaultExpenseCategories[1][1], async () => {
        expect(await expenseCategoryPage.verifyExpenseCategory(page, defaultExpenseCategories[1][0], defaultExpenseCategories[1][1])).toBeTruthy();
    }, testRunConfig.testRunTimeout)

    test("verify expense category: " + defaultExpenseCategories[2][0] + " - " + defaultExpenseCategories[2][1], async () => {
        expect(await expenseCategoryPage.verifyExpenseCategory(page, defaultExpenseCategories[2][0], defaultExpenseCategories[2][1])).toBeTruthy();
    }, testRunConfig.testRunTimeout)

    test("verify expense category: " + defaultExpenseCategories[3][0] + " - " + defaultExpenseCategories[3][1], async () => {
        expect(await expenseCategoryPage.verifyExpenseCategory(page, defaultExpenseCategories[3][0], defaultExpenseCategories[3][1])).toBeTruthy();
    }, testRunConfig.testRunTimeout)

    test("verify expense category: " + defaultExpenseCategories[4][0] + " - " + defaultExpenseCategories[4][1], async () => {
        expect(await expenseCategoryPage.verifyExpenseCategory(page, defaultExpenseCategories[4][0], defaultExpenseCategories[4][1])).toBeTruthy();
    }, testRunConfig.testRunTimeout)
})