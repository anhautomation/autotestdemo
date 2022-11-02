import puppeteer from "puppeteer";
import { testRunConfig } from "../variables/webconfig";
import { getCellText } from "../webComponents/table";

export let filterXpath = "//button[.//*[contains(text(),'Lọc kết quả')]]";

let waitingTabXpath = "//*[contains(text(),'CHỜ DUYỆT')]";
let approveTabXpath = "//*[contains(text(),'ĐÃ DUYỆT')]";
let allTabXpath = "//*[contains(text(),'TẤT CẢ')]";

let expenseReportTableXpath = "//*[@class='ant-table-content']/table";
let expenseReportTableBodyXpath = expenseReportTableXpath + "//tbody[@class='ant-table-tbody']";

let progressXpath = "//*[@class='inprogress-busy']";

export const clickWaitingTab =async (page:puppeteer.Page) => {
    await page.waitForXPath(waitingTabXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let waitingTab = await page.$x(waitingTabXpath);
    await waitingTab[0].click();
    await page.waitForXPath(expenseReportTableXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
}

export const clickApproveTab =async (page:puppeteer.Page) => {
    await page.waitForXPath(approveTabXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let approveTab = await page.$x(approveTabXpath);
    await approveTab[0].click();
    await page.waitForXPath(expenseReportTableXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
}

export const clickAllTab =async (page:puppeteer.Page) => {
    await page.waitForXPath(allTabXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let allTab = await page.$x(allTabXpath);
    await allTab[0].click();
    await page.waitForXPath(expenseReportTableXpath,{visible:true, timeout:testRunConfig.loadingTimeout});
}

export const verifyExpenseReportStatus =async (page:puppeteer.Page, reportStatus: string) => {
    await page.waitForXPath(expenseReportTableBodyXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let reportCount = (await page.$x(expenseReportTableBodyXpath + "/tr")).length;
    for (let i = 1; i <= reportCount; i++){
        let actualStatus = await getCellText(page, expenseReportTableBodyXpath, i, 1);
        if(actualStatus === reportStatus){
            return false;
        }
    }
    return true;
}