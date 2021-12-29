package automationcodingproject.Pages;

import org.openqa.selenium.WebDriver;

import automationcodingproject.ElementObjects.ProjectedFormLoginObjects;

public class ProtectedFormLoginPage extends ProjectedFormLoginObjects {
	public ProtectedFormLoginPage(WebDriver webDriver) {
		super(webDriver);
		// TODO Auto-generated constructor stub
	}

	public void Submit(String password) {
		InputPassword(password);
		ClickSubmitButton();
	}
}
