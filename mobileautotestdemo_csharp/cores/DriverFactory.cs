using System;
using System.IO;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.Support.UI;

namespace automatedtest.core{
    public class DriverFactory{
        // private static WebDrivers
        public static IWebDriver GetDriver(){
            string executionPath = Path.Join(System.IO.Directory.GetCurrentDirectory(), @"\drivers");
            ChromeOptions options = new ChromeOptions();
            // options.PageLoadStrategy = PageLoadStrategy.Normal;
            IWebDriver driver = new ChromeDriver(executionPath, options);
            // IWebDriver driver = new RemoteWebDriver(new Uri("http://127.0.0.1/wb/hub"), options);
            DefaultWait<IWebDriver> fluentWait = new DefaultWait<IWebDriver>(driver);
            fluentWait.Timeout = TimeSpan.FromSeconds(5);
            fluentWait.PollingInterval = TimeSpan.FromMilliseconds(250);
            /* Ignore the exception -NoSuchElementException that indicates that the element is not present */
            fluentWait.IgnoreExceptionTypes(typeof(NoSuchElementException));
            fluentWait.Message = "Element to be searchDefaultWaited not found";
            driver.Manage().Timeouts().PageLoad = TimeSpan.FromSeconds(5);
            return driver;
        }
    }
}