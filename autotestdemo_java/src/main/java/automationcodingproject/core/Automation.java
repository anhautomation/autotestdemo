package automationcodingproject.core;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.InputEvent;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Reporter;
import org.testng.SkipException;

/**
 * @author BaoAnh
 *
 */
public class Automation {

	protected  WebDriver _driver;
	protected  WebDriverWait _wait;
	protected  String _currentWindow;
	protected  ArrayList<String> _tabs;
	private String _locationImage;
	private static Automation instance=null;
	
	public static Automation getInstance(){
        if(instance==null){
            instance = new Automation();
        }
        return instance;
    }

	public void init() {
		try {
			new Setting().loadConfiguration();			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw new SkipException("unkown error " + e);
		}
	}

	public void dispose() {
		if (_driver != null) {
			_driver.quit();
		}
	}

	protected By byLocator(String locator) {
		By by = null;
		if (locator.startsWith("id=")) {
			locator = locator.substring(3);
			by = By.id(locator);
		} else if (locator.startsWith("name=")) {
			locator = locator.substring(5);
			by = By.name(locator);
		} else if (locator.startsWith("css=")) {
			locator = locator.substring(4);
			by = By.cssSelector(locator);
		} else if (locator.startsWith("link=")) {
			locator = locator.substring(5);
			by = By.linkText(locator);
		} else {
			by = By.xpath(locator);
		}
		return by;
	}

	public WebElement getWebElement(String locator) {
		return _driver.findElement(byLocator(locator));
	}

	public List<WebElement> getWebElements(String locator) {
		return _driver.findElements(byLocator(locator));
	}

	public void getUrl(String url) {
		_driver.get(url);
		pageLoadingTimeout();
	}

	protected void windowMaximize() {
		_driver.manage().window().maximize();
	}

	public WebDriver setWebDriver() {
		return setWebDriver(Setting.CONFIGURATION.getProperty("selenium.browser"));
	}

	public WebDriver setWebDriver(String browserType) {
		browserType = browserType.toLowerCase();
		try {
			switch (browserType) {
			case "firefox":
				break;
			case "ie":
				break;
			case "chrome":
				System.setProperty("webdriver.chrome.driver",
						System.getProperty("user.dir")
								+ "/src/main/resources/chromedriver.exe");
				_driver = new ChromeDriver();
				break;
			}
		} catch (WebDriverException e) {
			Reporter.log("initial driver error : " + e.getMessage());
			throw new WebDriverException("initial driver error : "
					+ e.getMessage());
		}
		windowMaximize();
		return _driver;
	}

	public void openBrowser(String url) {
		getUrl(url);
		Report("Open browser with url " + url);
	}

	public void closeBrowser() {
		_driver.quit();
	}

	/**
	 * refresh page
	 * */
	public void refreshPage() {
		_driver.navigate().refresh();
	}

	/**
	 * check element present
	 * 
	 * @param locator
	 *            - locator of element UI
	 * */
	public boolean isElementPresent(String locator) {
		implicitlyWaiting(2, TimeUnit.SECONDS);
		try {
			getWebElement(locator);
			return true;
		} catch (Exception e) {
			return false;
		} finally {
			implicitlyWaiting(Long.parseLong(Setting.CONFIGURATION
					.getProperty("selenium.timeout")), TimeUnit.SECONDS);
		}
	}

	/**
	 * check element displayed
	 * 
	 * @param locator
	 *            - locator of element UI
	 * */
	public boolean isElementDisplayed(String locator) {
		try {
			return getWebElement(locator).isDisplayed();
		} catch (Exception e) {
			return false;
		}
	}
	
	/**
	 * check checkbox element selected
	 * 
	 * @param locator
	 *            - locator of element UI
	 * */
	public boolean isCheckboxSelected(String locator){
		try {
			return getWebElement(locator).isSelected();
		} catch (Exception e) {
			return false;
		}
	}

	public static void pause(int time) {
		try {
			Thread.sleep(time);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			Reporter.log("pause test error");
			throw new SkipException("pause test script error " + e);
		}
	}

	/**
	 * close unexpected pop-up window
	 * */
	public void closePopupWindow() {
		_currentWindow = _driver.getWindowHandle();
		for (String winHandle : _driver.getWindowHandles()) {
			if (!_tabs.contains(winHandle)) {
				_driver.switchTo().window(winHandle);
				_driver.close();
				_driver.switchTo().window(_currentWindow);
			}
		}
	}

	/**
	 * get view port width
	 * */
	protected long getViewPortWidth() {
		return (long) ((JavascriptExecutor) _driver)
				.executeScript("return $(window).width();");
	}

	/**
	 * get view port height
	 * */
	protected long getViewPortHeight() {
		return (long) ((JavascriptExecutor) _driver)
				.executeScript("return $(window).height();");
	}

	/**
	 * get full screen height
	 * */
	protected long getScreenHeight() {
		return (long) ((JavascriptExecutor) _driver)
				.executeScript("return $(document).height();");
	}

	/**
	 * scroll browser to top
	 * */
	public void scrollTopBrowser() {
		JavascriptExecutor js = (JavascriptExecutor) _driver;
		js.executeScript("document.getElementById('header').scrollIntoView(true);");
		try {
			Thread.sleep(500);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * scroll browser to position
	 * 
	 * @param longs
	 *            - position to scroll browser to
	 * */
	public void browserScrollBy(int longs) {
		JavascriptExecutor js = (JavascriptExecutor) _driver;
		js.executeScript("window.scrollBy(0," + longs + ")");
	}

	public void scrollIntoView(String locator) {
		((JavascriptExecutor) _driver).executeScript(
				"arguments[0].scrollIntoView();", getWebElement(locator));
	}
	
	public void scrollIntoView(WebElement element) {
		((JavascriptExecutor) _driver).executeScript(
				"arguments[0].scrollIntoView();", element);
	}

	/**
	 * set time for loading waiting of driver
	 * 
	 * @param timeout
	 *            - duration for driver time out
	 * @param timeunit
	 *            - unit of time (second, minutes, ...)
	 * */
	protected void pageLoadingTimeout(long timeout, TimeUnit timeUnit) {
		_driver.manage().timeouts().pageLoadTimeout(timeout, timeUnit);
	}

	/**
	 * set time for loading waiting of driver duration is get from
	 * setting.properties time unit is second
	 * */
	public void pageLoadingTimeout() {
		pageLoadingTimeout(Long.parseLong(Setting.CONFIGURATION
				.getProperty("selenium.timeout")), TimeUnit.SECONDS);
	}

	/**
	 * set time for implicit waiting of driver
	 * 
	 * @param timeout
	 *            - duration for driver time out
	 * @param timeunit
	 *            - unit of time (second, minutes, ...) time unit is second
	 * */
	protected void implicitlyWaiting(long timeout, TimeUnit timeUnit) {
		_driver.manage().timeouts().implicitlyWait(timeout, timeUnit);
	}

	/**
	 * set time for implicit waiting of driver duration is get from
	 * setting.properties time unit is second
	 * */
	protected void implicitlyWaiting() {
		implicitlyWaiting(Long.parseLong(Setting.CONFIGURATION
				.getProperty("selenium.wait")), TimeUnit.SECONDS);
	}

	/**
	 * waiting for element is clickable
	 * 
	 * @param locator
	 *            - locator of element UI
	 * */
	public void waitForReadyToClick(String locator) {
		_wait = new WebDriverWait(_driver, Long.parseLong(Setting.CONFIGURATION
				.getProperty("selenium.wait")));
		_wait.until(ExpectedConditions.elementToBeClickable(byLocator(locator)));
	}

	/**
	 * waiting for element is visible
	 * 
	 * @param locator
	 *            - locator of element UI
	 * */
	public void waitForElementVisibility(String locator) {
		try {
			_wait = new WebDriverWait(_driver,
					Long.parseLong(Setting.CONFIGURATION
							.getProperty("selenium.wait")));
			_wait.until(ExpectedConditions
					.visibilityOfElementLocated(byLocator(locator)));
		} catch (Exception e) {
			Report("waiting timeout "
					+ Setting.CONFIGURATION.getProperty("selenium.wait"));
		}
	}
	
	public void waitForElementVisibility(WebElement element) {
		try {
			_wait = new WebDriverWait(_driver,
					Long.parseLong(Setting.CONFIGURATION
							.getProperty("selenium.wait")));
			_wait.until(ExpectedConditions
					.visibilityOf(element));
		} catch (Exception e) {
			Report("waiting timeout "
					+ Setting.CONFIGURATION.getProperty("selenium.wait"));
		}
	}

	public void waitForAnimationDone(String locator) {
		_wait = new WebDriverWait(_driver, Long.parseLong(Setting.CONFIGURATION
				.getProperty("selenium.wait")));
		_wait.until(new ExpectedCondition<Boolean>() {
			public Boolean apply(WebDriver driver) {
				String isAnimated = ((JavascriptExecutor) driver)
						.executeScript(
								"return jQuery('" + locator
										+ "').is(':animated')").toString();
				return isAnimated.equalsIgnoreCase("false");
			}
		});
	}

	/**
	 * click on element
	 * 
	 * @param locator
	 *            - locator of element UI
	 * */
	public void clickElement(String locator) {
		getWebElement(locator).click();
		pageLoadingTimeout();
		pause(1000);
	}
	
	/**
	 * click on element by using real mouse 
	 * 
	 * @param locator
	 *            - locator of element UI
	 * */
	public void clickRobotElement(String locator){
		Robot r;
		try {
			r = new Robot();
			r.mouseMove(getWebElement(locator).getLocation().getX() + 2 , getWebElement(locator).getLocation().getY() + 2 + 72);
			r.mousePress(InputEvent.BUTTON1_MASK);
			r.mouseRelease(InputEvent.BUTTON1_MASK);
			pageLoadingTimeout();
			pause(1000);
		} catch (AWTException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * click on element
	 * 
	 * @param element
	 *            - WebElement object of element UI
	 * */
	public void clickElement(WebElement element) {
		element.click();
	}

	/**
	 * clear text and input new text
	 * 
	 * @param locator
	 *            - locator of element UI
	 * @param text
	 * */
	public void inputTextToElement(String locator, String text) {
		getWebElement(locator).clear();
		getWebElement(locator).sendKeys(text);
//		waitForAjaxLoading();
	}
	
	public void inputTextToFocusElement(String text){
		_driver.switchTo().activeElement().clear();
		_driver.switchTo().activeElement().sendKeys(text);
//		waitForAjaxLoading();
	}

	/**
	 * clear text and input new text
	 * 
	 * @param element
	 *            - WebElement object of element UI
	 * @param text
	 * */
	public static void inputTextToElement(WebElement element, String text) {
		element.clear();
		element.sendKeys(text);
	}

	public void selectItem(String locator, String option) {
		Select select = new Select(getWebElement(locator));
		select.selectByVisibleText(option);
	}

	/**
	 * get text of element
	 * 
	 * @param element
	 *            - WebElement object of element UI return text of element
	 * */
	public static String getTextOfElement(WebElement element) {
		return element.getCssValue("textContent").toString().trim();
	}

	/**
	 * get text of element
	 * 
	 * @param locator
	 *            - locator of element UI return text of element
	 * */
	public String getTextOfElement(String locator) {
		return getWebElement(locator).getAttribute("textContent").toString()
				.trim();
	}

	/**
	 * get attribute of element
	 * 
	 * @param locator
	 *            - locator of element UI return text of element
	 * */
	public String getAttributeOfElement(String locator, String attribute) {
		return getWebElement(locator).getAttribute(attribute).toString().trim();
	}

	/**
	 * get css value of element
	 * 
	 * @param locator
	 *            - locator of element UI return text of element
	 * */
	public String getCssValueOfElement(String locator, String cssValue) {
		return getWebElement(locator).getCssValue(cssValue).toString().trim();
	}

	/**
	 * count number of elements
	 * 
	 * @param locator
	 *            - locator of element UI return number of elements
	 * */
	public int countElements(String locator) {
		return getWebElements(locator).size();
	}

	/**
	 * take screenshot at driver's position and save it
	 * 
	 * @param imageName
	 *            - take screenshot with name
	 * */
	public void driverScreenShot(String imageName) {
		imageName = imageName + ".jpeg";
		String locationFile;
		locationFile = LocationFile.WORKFLOW_TEST_RUN;
		File scrFile = ((TakesScreenshot) _driver)
				.getScreenshotAs(OutputType.FILE);
		if (new File(locationFile).exists() == false) {
			new File(locationFile).mkdirs();
		}
		try {
			FileUtils.copyFile(scrFile, new File(locationFile + imageName));
		} catch (IOException e) {
			// TODO Auto-generated catch block
		}
	}

	/**
	 * Output report - message and image on formatted tables
	 * 
	 * @param message
	 *            - message text is displayed on report
	 * @param imageName
	 *            - take screenshot with name
	 * */
	public void Report(String message, String imageName, String status) {
		if (imageName != null) {
			driverScreenShot(imageName);
		}

		String formatReport = "<table> " + "<tr>";
		if (StatusReport.PASS.equalsIgnoreCase(status)) {
			formatReport += "<td color='green' width='500' aligh='right'><font color='green'>"
					+ message + "</font></td>";
		} else if (StatusReport.FAILED.equalsIgnoreCase(status)) {
			formatReport += "<td width='500' aligh='right'><font color='red'>"
					+ message + "</font></td>";
		} else if (StatusReport.WARNING.equalsIgnoreCase(status)) {
			formatReport += "<td width='500' aligh='right'><font color='yellow'>"
					+ message + "</font></td>";
		} else {
			formatReport += "<td width='500' aligh='right'>" + message
					+ "</font></td>";
		}
		if (imageName != null) {
			if (System.getenv("JOB_NAME") == null) {
				formatReport += "<td align='left'>" + "<a target='_blank' href='" + "file:///" + _locationImage + imageName + ".jpeg" + "'>";
				formatReport += "<img src = '" + "file:///" + _locationImage + imageName + ".jpeg";
			}else{
				formatReport += "<td align='left'>" + "<a target='_blank' href='"+ _locationImage + imageName + ".jpeg" + "'>";
				formatReport += "<img src = '" + _locationImage + imageName + ".jpeg";
			}
			formatReport  += "' width = '500' height = '250'/>" + "</a>" + "</td>";
		}
		formatReport += "</tr></table>";
		Reporter.log(formatReport);
	}

	/**
	 * Output report - message and image on formatted tables
	 * 
	 * @param message
	 *            - message text is displayed on report
	 * @param imageName
	 *            - take screenshot with name
	 * */
	public void Report(String message, String imageName) {
		driverScreenShot(imageName);

		String formatReport = "<table> <tr> <td width='500' aligh='right'>" + message + "</td>";
				if (System.getenv("JOB_NAME") == null) {
					formatReport += "<td align='left'>" + "<a target='_blank' href='" + "file:///" + _locationImage + imageName + ".jpeg" + "'>";
					formatReport += "<img src = '" + "file:///" + _locationImage + imageName + ".jpeg";
				}else{
					formatReport += "<td align='left'>" + "<a target='_blank' href='"+ _locationImage + imageName + ".jpeg" + "'>";
					formatReport += "<img src = '" + _locationImage + imageName + ".jpeg";
				}
				formatReport  += "' width = '500' height = '250'/>" + "</a>" + "</td></tr></table>";
		Reporter.log(formatReport);
		// _stepTest++;
	}

	/**
	 * Output report - message on formatted tables
	 * 
	 * @param message
	 *            - message text is displayed on report
	 * */
	public void Report(String message) {
		String formatReport = "<table><tr><td width='500' aligh='right'>"
				+ message + "</td></tr></table>";
		Reporter.log(formatReport);
	}

	/**
	 * mouse hover to element
	 * 
	 * @param locator
	 *            - locator of element UI
	 * */
	public void moveMouseToElement(String locator) {
		Actions action = new Actions(_driver);
		action.moveToElement(getWebElement(locator)).build().perform();
	}

	/**
	 * mouse hover to element and click
	 * 
	 * @param locator
	 *            - locator of element UI
	 * */
	public void mouseClickElement(String locator) {
		Actions action = new Actions(_driver);
		action.moveToElement(getWebElement(locator)).click().build().perform();
		action.release();
		pageLoadingTimeout();
//		waitForAjaxLoading();
	}
	
	/**
	 * mouse hover to element and click
	 * 
	 * @param locator
	 *            - locator of element UI
	 * */
	public void mouseClickElement(WebElement element) {
		waitForElementVisibility(element);
		scrollIntoView(element);
		Actions action = new Actions(_driver);
		action.moveToElement(element).click().build().perform();
		action.release();
		pageLoadingTimeout();
	}
	
	/**
	 * double click element
	 * 
	 * @param locator
	 *            - locator of element UI
	 * */
	public void doubleClickElement(String locator){
		Actions action = new Actions(_driver);
		action.doubleClick(getWebElement(locator)).build().perform();
	}

	/**
	 * drag and drop
	 * 
	 * @param sourceLocator
	 *            - locator of element UI need to be dragged and dropped
	 * @param destinationLocator
	 *            - locator of element UI where store element dragged and
	 *            dropped
	 * */
	public void dragAndDropElement(String sourceLocator,
			String destinationLocator) {
		Actions action = new Actions(_driver);
		action.dragAndDrop(getWebElement(sourceLocator),
				getWebElement(destinationLocator)).build().perform();
	}

	/**
	 * right click - using robot
	 * 
	 * @param xOffset
	 *            - x point
	 * @param yOffset
	 *            - y point
	 * */
	public void rightClickRobot(int xOffset, int yOffset) {
		Robot r;
		try {
			r = new Robot();
			r.mouseMove(xOffset, yOffset);
			r.mousePress(InputEvent.BUTTON3_MASK);
			r.mouseRelease(InputEvent.BUTTON3_MASK);
		} catch (AWTException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * move element from position to position - using robot
	 * 
	 * @param xOffsetFrom
	 *            - from x point
	 * @param yOffsetFrom
	 *            - from y point
	 * @param xOffsetTo
	 *            - to x point
	 * @param yOffsetTo
	 *            - to y point
	 * */
	public void moveRobot(int xOffsetFrom, int yOffsetFrom,
			int xOffsetTo, int yOffsetTo) {
		Robot r;
		try {
			r = new Robot();
			r.mouseMove(xOffsetFrom, yOffsetFrom);
			r.mousePress(InputEvent.BUTTON1_MASK);
			r.mouseMove(xOffsetTo, yOffsetTo);
			r.mouseRelease(InputEvent.BUTTON1_MASK);
		} catch (AWTException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
