import puppeteer from "puppeteer";
import { testRunConfig } from "../variables/webconfig";

let addBankButtonXpath = "//*[@class='add-bank-button']";
let bankCodeXpath = "//*[@id='bankCode']";
let accountNameXpath = "//*[@id='bankAccountHolder']";
let accountNumberXpath = "//*[@id='bankAccountNumber']";
let currencyXpath = "//*[@id='currency']";

export const clickAddBankAccountLink = async (page:puppeteer.Page) => {
    await page.waitForXPath(addBankButtonXpath,{visible:true, timeout: testRunConfig.loadingTimeout});
    let waitingStatusElement = await page.$x(addBankButtonXpath);
    await waitingStatusElement[0].click();
}

export const typeAccountName = async (page:puppeteer.Page, text: string) => {
    await page.waitForXPath(accountNameXpath,{visible:true, timeout:testRunConfig.loadingTimeout});
    let accountNameInput = await page.$x(accountNameXpath);
    await accountNameInput[0].type(text);
}

export const selectBankCode = async (page:puppeteer.Page, text: string) => {
    await page.waitForXPath(bankCodeXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let bankCodeSelectbox = await page.$x(bankCodeXpath);
    await bankCodeSelectbox[0].type(text);
}

export const selectCurrency = async (page:puppeteer.Page, text: string) => {
    await page.waitForXPath(bankCodeXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let bankCodeSelectbox = await page.$x(bankCodeXpath);
    await bankCodeSelectbox[0].type(text);
}