import puppeteer from "puppeteer";
import { newPage, close } from "../drivers/webdriver";
import { loadExpenseConfig, loadMondelezConfig, testRunConfig } from "../variables/webconfig";
import { defaultExpenseCategories } from "../variables/defaultExpenseCategories";

import * as loginPage from "../webPages/loginPage";
import * as companyInfoPage from "../webPages/companyInfoPage";
import * as sideMenu from "../webPages/sideMenu";
import * as expensePoliciesPage from "../webPages/expensePoliciesPage";
import * as expensePoliciesDetailPage from "../webPages/expensePoliciesDetailPage";

describe.each([
    [loadExpenseConfig().url, loadExpenseConfig().modUsername, loadExpenseConfig().modPassword, loadExpenseConfig().invoiceEmail, loadExpenseConfig().companyName]
    // [loadMondelezConfig().url, loadMondelezConfig().modUsername, loadMondelezConfig().modPassword, loadMondelezConfig().invoiceEmail, loadMondelezConfig().companyName]
])("Web - expense policy tests - %s" , (url, modUsername, modPassword, invoiceEmail, companyName)=>{
    let page: puppeteer.Page;
    let policyName = "Chính sách cơ bản cho toàn bộ nhân viên";
  
    beforeAll(async () => {
        page = await newPage();
        await page.goto(url, {waitUntil: "networkidle2"});
        await loginPage.submitLogin(page, modUsername, modPassword);
        await companyInfoPage.clickCompanyName(page, invoiceEmail, companyName);
    }, testRunConfig.testRunTimeout)

    afterAll(async () => {
        await close();
    }, testRunConfig.testRunTimeout)

    test("click policy tab", async () => {
        await sideMenu.clickPolicyLink(page);
    }, testRunConfig.testRunTimeout)

    test("verify policy name: " + policyName, async () => {
        expect(await expensePoliciesPage.verifyPolicyInList(page, policyName)).toBeTruthy();
    }, testRunConfig.testRunTimeout)

    test("click policy name: " + policyName, async () => {
        await expensePoliciesPage.clickPolicyInList(page, policyName);
    }, testRunConfig.testRunTimeout)

    test("click category tab",async () => {
        await expensePoliciesDetailPage.clickCategoryTab(page);
    }, testRunConfig.testRunTimeout)
    
    test.each([
        [defaultExpenseCategories[0][0], defaultExpenseCategories[0][1]],
        [defaultExpenseCategories[1][0], defaultExpenseCategories[1][1]],
        [defaultExpenseCategories[2][0], defaultExpenseCategories[2][1]],
        [defaultExpenseCategories[3][0], defaultExpenseCategories[3][1]],
        [defaultExpenseCategories[4][0], defaultExpenseCategories[4][1]],
    ])("verify expense category %s - %s ", async (categoryNameVI, categoryNameEN) => {
        expect(await expensePoliciesDetailPage.verifyExpenseCategory(page, categoryNameVI, categoryNameEN)).toBeTruthy();
    }, testRunConfig.testRunTimeout)

    test.skip("click employee tab ", async () => {
        await expensePoliciesDetailPage.clickEmployeeTab(page);
    }, testRunConfig.testRunTimeout)

    test.skip("click business trip tab ", async () => {
        await expensePoliciesDetailPage.clickBusinessTripTab(page);
    }, testRunConfig.testRunTimeout)
})