using automatedtest.core;
using Gauge.CSharp.Lib.Attribute;
using OpenQA.Selenium;
using System;
using FluentAssertions;
using OpenQA.Selenium.Support.UI;
using SeleniumExtras.WaitHelpers;

namespace automatedtest.testcode{
    public class weblogin{
        [Step("navigate to <url>")]
        public void NavigateTo(string url){
            Driver.GetDriver().Url = url;
        }
        [Step("user inputs username <username>")]
        public void InputUsername(string username){
            string usernameLocator = "//*[contains(@name, 'username')]";
            IWebElement usernameField = Driver.GetDriver().FindElement(By.XPath(usernameLocator));
            usernameField.Clear();
            usernameField.SendKeys(username);
        }
        [Step("user inputs password <password>")]
        public void InputPassword(string password){
            string passwordLocator = "//*[contains(@name, 'password')]";
            IWebElement passwordField = Driver.GetDriver().FindElement(By.XPath(passwordLocator));
            passwordField.Clear();
            passwordField.SendKeys(password);
        }
        [Step("user clicks a submit button")]
        public void ClickSubmitButton(){
            string logonLocator = "//*[contains(@class,'button_login')]";
            IWebElement logonButton = Driver.GetDriver().FindElement(By.XPath(logonLocator));
            logonButton.Click();
        }
        [Step("verify agent name is <expectation>")]
        public void VerifyAgentName(string expectation){
            WebDriverWait driverWait = new WebDriverWait(Driver.GetDriver(), TimeSpan.FromSeconds(10));
            string loadingLocator = "//*[contains(@class,'cdk-overlay-container')]";
            string agentNameLocator = "//*[contains(@class,'text_VJ')]";
            driverWait.Until(ExpectedConditions.InvisibilityOfElementLocated(By.XPath(loadingLocator)));
            IWebElement agentNameField = driverWait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementIsVisible(By.XPath(agentNameLocator)));         
            agentNameField.Text.ToString().Should().Be(expectation);
        }
    }

}