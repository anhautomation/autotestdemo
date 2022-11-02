import puppeteer from "puppeteer";

export let expenseRequestTabXpath = "//*[./*[contains(text(),'Quy trình duyệt')]]//*[contains(text(),'Yêu cầu chi tiêu')]";
let expenseRequestPanelXpath = "//*[@class='ant-row']/*[@class='__4OVUYCua' and contains(text(),'Yêu cầu chi tiêu')]";
let autoRequestApprovalRadioButtonXpath = "";
let manualRequestManualRadioButtonXpath = "//*";

let expenserReportTab = "//*[./*[contains(text(),'Quy trình duyệt')]]//*[contains(text(),'Đề nghị thanh toán')]";
let expenseReportPanelXpath = "//*[@class='ant-row']/*[@class='__4OVUYCua' and contains(text(),'Đề nghị thanh toán')]";
let autoReportApprovalRadioButtonXpath = "";
let manualReportManualRadioButtonXpath = "";


