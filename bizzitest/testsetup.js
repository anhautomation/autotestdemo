const puppeteer = require("puppeteer");
const config = require("./config/bizzi_config");

async function testsetup(){
    browser = await puppeteer.launch({
        headless: config.browser.headless,
        defaultViewport: null,
        args: ['--start-fullscreen'] });
    return browser;
}

module.exports.testsetup = testsetup;