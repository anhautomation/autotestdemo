import puppeteer from "puppeteer";
import { testRunConfig } from "../variables/webconfig";
import { getCellText } from "../webComponents/table";

import * as expensePoliciesDetailPage from "../webPages/expensePoliciesDetailPage";

export let filterXpath = "//button[.//*[contains(text(),'Lọc chính sách')]]";
let policyTableXpath = "//*[@class='ant-table-content']/table";
let policyTableBodyXpath = policyTableXpath + "//tbody[@class='ant-table-tbody']";

export const verifyPolicyInList = async(page: puppeteer.Page, policyName: string) => {
    await page.waitForXPath(policyTableBodyXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let policyCount = (await page.$x(policyTableBodyXpath + "/tr")).length;
    for (let i = 1; i <= policyCount; i++){
        let actualPolicyName = await getCellText(page, policyTableBodyXpath, i, 1);
        if(actualPolicyName === policyName){
            return true;
        }
    }
    return false;
}

export const clickPolicyInList =async (page:puppeteer.Page, policyName: string) => {
    await page.waitForXPath(policyTableBodyXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let policyCount = (await page.$x(policyTableBodyXpath + "/tr")).length;
    let policyNameLinkXpath = policyTableBodyXpath;
    for (let i = 1; i <= policyCount; i++){
        let actualPolicyName = await getCellText(page, policyTableBodyXpath, i, 1);
        if(actualPolicyName === policyName){
            policyNameLinkXpath = policyNameLinkXpath + "/tr[" + i + "]/td[1]/a[.//*[contains(text(),'" + policyName + "')]]";
            break;
        }
    }
    let policyNameLink = await page.$x(policyNameLinkXpath);
    await policyNameLink[0].click(); 
    await page.waitForXPath(expensePoliciesDetailPage.editPolicyButtonXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
}