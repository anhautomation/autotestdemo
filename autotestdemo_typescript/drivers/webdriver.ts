import puppeteer from "puppeteer";

let browser:any = null; 
let page:any = null;

let browserConfig = {
    headless: true,
    args:[
        "--no-sandbox",
        "--disable-setuid-sandbox"
    ]
}

const newBrowser = async() => {
    return await puppeteer.launch(browserConfig);
}

const getBrowser = async() => {
    // if (!browser) {
    //     browser = await newBrowser();
    // }
    browser = await newBrowser();
    return browser;
}

const setBrowserConfig = (_browserConfig: any) => {
    browserConfig = _browserConfig;
}

export const newPage = async() => {
    // if(!page || !page.close()){
    //     var browser = await getBrowser();
    //     page = await browser.newPage();
    //     page.setViewport({
    //         width: 1440,
    //         height: 900
    //     })
    // }
    var browser = await getBrowser();
    page = await browser.newPage();
    page.setViewport({
        width: 1440,
        height: 900
    })
    return page;
}

export const handback = async() => {
    await page.close();
}

export const close = async() => {
    await browser.close();
}