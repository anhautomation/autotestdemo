package automationcodingproject.ElementObjects;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.testng.Assert;

import automationcodingproject.BaseElementObject.BaseObject;

public class ProjectedFormLoginObjects extends BaseObject {

	
	public ProjectedFormLoginObjects(WebDriver webDriver) {
		super(webDriver);
	}

	@FindBy(xpath="//*[@id='Password']")
	WebElement PasswordField;
	
	@FindBy(xpath="//*[contains(@value,'Submit')]")
	WebElement SubmitButton;
	
	public void InputPassword(String password) {
		PasswordField.clear();
		PasswordField.sendKeys(password);
	}
	
	public void ClickSubmitButton() {
		if(SubmitButton.isEnabled()) {
			SubmitButton.click();
		}
		else {
			String error = "Failed - Submit button is disable";
			automation.Report(error);
			Assert.fail(error);
		}
	}
}
