package automationcodingproject.BaseElementObject;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.PageFactory;

import automationcodingproject.core.Automation;

public class BaseObject {
	protected WebDriver webDriver;
	protected Automation automation;
	
	public BaseObject(WebDriver webDriver) {
		this.webDriver = webDriver;
		PageFactory.initElements(webDriver, this);
		automation = Automation.getInstance();
	}
	
	
}
