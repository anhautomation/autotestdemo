package automationcodingproject.Pages;

import org.openqa.selenium.WebDriver;
import org.testng.Assert;

import automationcodingproject.ElementObjects.LeadCaptureFormObjects;

public class LeadCaptureFormPage extends LeadCaptureFormObjects {

	public LeadCaptureFormPage(WebDriver webDriver) {
		super(webDriver);
		// TODO Auto-generated constructor stub
	}
	
	public boolean SubmitForm(String firstName, String lastName, String streetAddress, String addressLine2, String city, String state, String zipCode, String phone, String emailAddress, String date, String month, String year) {
		InputFirstName(firstName);
		InputLastName(lastName);
		InputStreetAddress(streetAddress);
		InputAddressLine2(addressLine2);
		InputCity(city);
		SelectState(state);
		InputZipCode(zipCode);
		InputPhoneNumber(phone);
		InputEmailAddress(emailAddress);
		SelectDate(date, month, year);
		ClickSubmitButton();
		
		String expectedError = "Response required";
		String expectedInvalidMessage = "Please review the form and correct the highlighted items.";
		boolean isFormSubmitted = true;
		if(firstName == null || firstName.isEmpty()) {
			isFormSubmitted = false;
			if(FirstNameErrorMessage.isDisplayed()) {
				String currentError = FirstNameErrorMessage.getText();
				Assert.assertEquals(currentError, expectedError, "error message does not match expectation ! actual : " + currentError + " - expectation : " + expectedError);
			}
			else {
				Assert.fail("Failed - First Name field is null but error message is not displayed !");
			}
		}
		
		if(lastName == null || lastName.isEmpty()) {
			isFormSubmitted = false;
			if(LastNameErrorMessage.isDisplayed()) {
				String currentError = LastNameErrorMessage.getText();
				Assert.assertEquals(currentError, expectedError, "error message does not match expectation ! actual : " + currentError + " - expectation : " + expectedError);
			}
			else {
				Assert.fail("Failed - Last Name field is null but error message is not displayed !");
			}
		}
		
		if(streetAddress == null || streetAddress.isEmpty()) {
			isFormSubmitted = false;
			if(StreetAddressErrorMessage.isDisplayed()) {
				String currentError = StreetAddressErrorMessage.getText();
				Assert.assertEquals(currentError, expectedError, "error message does not match expectation ! actual : " + currentError + " - expectation : " + expectedError);
			}
			else {
				Assert.fail("Failed - Street Address field is null but error message is not displayed !");
			}
		}
		
		if(city == null || city.isEmpty()) {
			isFormSubmitted = false;
			if(CityErrorMessage.isDisplayed()) {
				String currentError = CityErrorMessage.getText();
				Assert.assertEquals(currentError, expectedError, "error message does not match expectation ! actual : " + currentError + " - expectation : " + expectedError);
			}
			else {
				Assert.fail("Failed - City field is null but error message is not displayed !");
			}
		}
		
		if(state == null || state.isEmpty()) {
			isFormSubmitted = false;
			if(StateErrorMessage.isDisplayed()) {
				String currentError = StateErrorMessage.getText();
				Assert.assertEquals(currentError, expectedError, "error message does not match expectation ! actual : " + currentError + " - expectation : " + expectedError);
			}
			else {
				Assert.fail("Failed - State select box is null but error message is not displayed !");
			}
		}
		
		if(zipCode == null || zipCode.isEmpty()) {
			isFormSubmitted = false;
			if(ZipCodeErrorMessage.isDisplayed()) {
				String currentError = ZipCodeErrorMessage.getText();
				Assert.assertEquals(currentError, expectedError, "error message does not match expectation ! actual : " + currentError + " - expectation : " + expectedError);
			}
			else {
				Assert.fail("Failed - Zip Code field is null but error message is not displayed !");
			}
		}
		
		if(phone != null && phone.isEmpty() == false && phone != "")  {
			if(phone.contains("[^0-9]") == true || phone.length() < 10) {
				isFormSubmitted = false;
				String exptectedError = "Invalid phone number";
				if(PhoneNumberErrorMessage.isDisplayed()) {
					String currentError = PhoneNumberErrorMessage.getText();
					Assert.assertEquals(currentError, exptectedError, "error message does not match expectation ! actual : " + currentError + " - expectation : " + expectedError);
				}
				else {
					Assert.fail("Failed - Phone Number field is invalid but error message is not displayed !");
				}
			}
		}
		
		if(emailAddress == null || emailAddress.isEmpty()) {
			isFormSubmitted = false;
			if(EmailAddressErrorMessage.isDisplayed()) {
				String currentError = EmailAddressErrorMessage.getText();
				Assert.assertEquals(currentError, expectedError, "error message does not match expectation ! actual : " + currentError + " - expectation : " + expectedError);
			}
			else {
				Assert.fail("Failed - Email Address field is null but error message is not displayed !");
			}
		}
		
		if(emailAddress.contains("^(.+)@(.+)$")) {
			if(EmailAddressField.isDisplayed() == false) {
				Assert.fail("Failed - Email Address field is invalid but the form is still submitted ! email : " + emailAddress);
			}
		}

		if(year == null || month == null || date == null || year.isEmpty() || month == null || date == null) {
			isFormSubmitted = false;
			if(SelectDateErrorMessage.isDisplayed()) {
				String currentError = SelectDateErrorMessage.getText();
				Assert.assertEquals(currentError, expectedError, "error message does not match expectation ! actual : " + currentError + " - expectation : " + expectedError);
			}
			else {
				Assert.fail("Failed - Select Date field is null but error message is not displayed !");
			}
		}
		
		if(isFormSubmitted = false) {
			if(SelectDateErrorMessage.isDisplayed()) {
				String currentInvalidMessage = InvalidMessageField.getText();
				Assert.assertEquals(currentInvalidMessage, expectedInvalidMessage, "invalid message does not match expectation ! actual : " + currentInvalidMessage + " - expectation : " + expectedInvalidMessage);
			}
			else {
				Assert.fail("Failed - Invalid Message field is not displayed when required field is null !");
			}
			return isFormSubmitted;
		}
		return isFormSubmitted;
	}
}
