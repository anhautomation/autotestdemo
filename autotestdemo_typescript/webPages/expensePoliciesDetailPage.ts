import puppeteer from "puppeteer";
import { testRunConfig } from "../variables/webconfig";
import { getCellText } from "../webComponents/table";

export let editPolicyButtonXpath = "//button[.//*[contains(text(),'Sửa chính sách')]]";
let stopPolicyButtonXpath = "//button[.//*[contains(text(),'Dừng chính sách')]]";

let categoryTabXpath = "//*[@role='tab' and contains(text(),'Danh mục')]";
let categoryTableXpath = "//*[@class='ant-table-content']/table";
let categoryTableBodyXpath = categoryTableXpath + "//tbody[@class='ant-table-tbody']";

let employeeTabXpath = "//*[@role='tab' and contains(text(),'nhân viên')]";
let employeeTableXpath = "//*[@class='ant-table-content']/table";
let employeeTableBodyXpath = employeeTableXpath + "//tbody[@class='ant-table-tbody']";

let businessTripTabXpath = "//*[@role='tab' and contains(text(),'công tác')]";

export const clickCategoryTab =async (page:puppeteer.Page) => {
    await page.waitForXPath(categoryTabXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let categoryTab = await page.$x(categoryTabXpath);
    await categoryTab[0].click();
    await page.waitForXPath(categoryTableBodyXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
}

export const clickEmployeeTab =async (page:puppeteer.Page) => {
    await page.waitForXPath(businessTripTabXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let businessTripTab = await page.$x(businessTripTabXpath);
    await businessTripTab[0].click();
    // await page.waitForXPath(employeeTableBodyXpath,{visible:true, timeout:webconfig.loadingTimeout});
}

export const clickBusinessTripTab =async (page:puppeteer.Page) => {
    await page.waitForXPath(employeeTabXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let employeeTab = await page.$x(employeeTabXpath);
    await employeeTab[0].click();
    await page.waitForXPath(employeeTableBodyXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
}

export const verifyExpenseCategory = async(page:puppeteer.Page, categoryNameVI:string, categoryNameEN:string) => {
    await page.waitForXPath(categoryTableBodyXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let categoryCount = (await page.$x(categoryTableBodyXpath + "/tr")).length;
    for (let i = 1; i <= categoryCount; i++){
        let actualCategoryName = await getCellText(page, categoryTableBodyXpath, i, 1);
        if(actualCategoryName === categoryNameVI){
            actualCategoryName = await getCellText(page, categoryTableBodyXpath, i, 2);
            if(actualCategoryName !== categoryNameEN){
                return false;
            }
            return true;
        }
    }
    return false;
}

export const verifyEmployee = async (page:puppeteer.Page, employeeName: string, employeeDepartment: string, employeeEmail: string, employeeStatus: string) => {
    await page.waitForXPath(employeeTableBodyXpath,{visible: true, timeout: testRunConfig.loadingTimeout});
    let categoryCount = (await page.$x(employeeTableBodyXpath + "/tr")).length;
    for (let i = 1; i <= categoryCount; i++){
        let actualEmployeeEmail = await getCellText(page, employeeTableBodyXpath, i, 3);
        if(actualEmployeeEmail === employeeEmail){
            let actualEmployeeName = await getCellText(page, employeeTableBodyXpath, i, 1);
            if(actualEmployeeName !== employeeName){
                return false;
            }
            let actualEmployeeDepartment = await getCellText(page, employeeTableBodyXpath, i, 2);
            if(actualEmployeeDepartment !== employeeDepartment){
                return false;
            }
            let actualEmployeeStatus = await getCellText(page, employeeTableBodyXpath, i, 4);
            if(actualEmployeeStatus !== employeeStatus){
                return false;
            }
            return true;
        }
    }
    return false;
}

