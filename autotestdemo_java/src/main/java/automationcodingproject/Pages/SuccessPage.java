package automationcodingproject.Pages;

import org.openqa.selenium.WebDriver;
import org.testng.Assert;

import automationcodingproject.ElementObjects.SuccessPageObjects;

public class SuccessPage extends SuccessPageObjects {
	public SuccessPage(WebDriver webDriver) {
		super(webDriver);
		// TODO Auto-generated constructor stub
	}

	public void VerifySuccessTitleDisplayed(boolean conditionCheck) {
		if(conditionCheck) {
			String exptectedText = "Thank you!";
			Assert.assertTrue(SuccessTitleField.isDisplayed(), "This page is not displayed but expectation is yes");
			String currentText = SuccessTitleField.getText();
			Assert.assertEquals(currentText, exptectedText, "Success Title text does not match expectation ! actual : " + currentText + " - expectation : " + exptectedText);
		}

	}
}
