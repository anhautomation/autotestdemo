package automationcodingproject.ElementObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import automationcodingproject.BaseElementObject.BaseObject;

public class SuccessPageObjects extends BaseObject {
	public SuccessPageObjects(WebDriver webDriver) {
		super(webDriver);
		// TODO Auto-generated constructor stub
	}

	@FindBy(xpath="//*[@class='success-title']")
	protected WebElement SuccessTitleField;
	
	
}
