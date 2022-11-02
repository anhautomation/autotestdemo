import puppeteer from "puppeteer";
import { testRunConfig } from "../variables/webconfig";
import { getCellText } from "../webComponents/table";

export let addCategoryButtonXpath = "//button[.//*[contains(text(),'Thêm danh mục')]]"; 
let categoryTableXpath = "//*[@class='ant-table-content']/table";
let categoryTableBodyXpath = categoryTableXpath + "//tbody[@class='ant-table-tbody']";

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