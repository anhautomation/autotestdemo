using Gauge.CSharp.Lib.Attribute;
using OpenQA.Selenium;

namespace automatedtest.core{
    public class Driver{
        private static IWebDriver driver;

        public static IWebDriver GetDriver()
        {
            return driver;
        }

        public static void SetDriver(IWebDriver value)
        {
            driver = value;
        }

        [BeforeScenario]
        public void BeforeSpecRun(){
            SetDriver(DriverFactory.GetDriver());
        }

        [AfterScenario]
        public void AfterSpecRun(){
            if(GetDriver() != null){
                GetDriver().Quit();
            }
        }
    }
}