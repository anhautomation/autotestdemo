package automationcodingproject.ElementObjects;

import org.apache.commons.lang3.ArrayUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;

import automationcodingproject.BaseElementObject.BaseObject;

public class LeadCaptureFormObjects extends BaseObject {
	
	
	public LeadCaptureFormObjects(WebDriver webDriver) {
		super(webDriver);
	}
	
	@FindBy(xpath="//*[@class='form_table invalid']//*[@class='invalid_message']")
	protected WebElement InvalidMessageField;

	@FindBy(xpath="//*[@id='RESULT_TextField-1']")
	protected WebElement FirstNameField;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-1']/../*[contains(@class,'invalid_message')]")
	protected WebElement FirstNameErrorMessage;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-2']")
	protected WebElement LastNameField;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-2']/../*[contains(@class,'invalid_message')]")
	protected WebElement LastNameErrorMessage;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-3']")
	protected WebElement StreetAddressField;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-3']/../*[contains(@class,'invalid_message')]")
	protected WebElement StreetAddressErrorMessage;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-4']")
	protected WebElement AddressLine2Field;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-5']")
	protected WebElement CityField;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-5']/../*[contains(@class,'invalid_message')]")
	protected WebElement CityErrorMessage;
	
	@FindBy(xpath="//*[@id='RESULT_RadioButton-6']")
	protected WebElement StateSelectBox;
	
	@FindBy(xpath="//*[@id='RESULT_RadioButton-6']/../*[contains(@class,'invalid_message')]")
	protected WebElement StateErrorMessage;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-7']")
	protected WebElement ZipCodeField;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-7']/../*[contains(@class,'invalid_message')]")
	protected WebElement ZipCodeErrorMessage;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-8']")
	protected WebElement PhoneNumberField;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-8']/../*[contains(@class,'invalid_message')]")
	protected WebElement PhoneNumberErrorMessage;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-9']")
	protected WebElement EmailAddressField;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-9']/../*[contains(@class,'invalid_message')]")
	protected WebElement EmailAddressErrorMessage;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-10']")
	protected WebElement CalendarField;
	
	@FindBy(xpath="//*[@id='RESULT_TextField-10']/../*[contains(@class,'invalid_message')]")
	protected WebElement SelectDateErrorMessage;
	
	@FindBy(xpath="//img[contains(@class, 'svg popup_button inline_button')]")
	protected WebElement CalendarImg;
	
	@FindBy(xpath="//*[contains(@data-handler,'selectYear')]")
	protected WebElement CalendarYearSelectBox;
	
	@FindBy(xpath="//*[contains(@class,'ui-datepicker-month')]")
	protected WebElement CalendarMonthField;
	
	@FindBy(xpath="//*[contains(text(),'Next')]")
	protected WebElement CalendarMonthNextButton;
	
	@FindBy(xpath="//*[contains(text(),'Prev')]")
	protected WebElement CalendarMonthPreviousButton;
	
	@FindBy(xpath="//*[contains(@class,'ui-datepicker-calendar')]")
	protected WebElement CalendarDatePicker;
		
	@FindBy(xpath="//*[@id='FSsubmit']")
	protected WebElement SubmitButton;
	
	public void InputFirstName(String name) {
		FirstNameField.clear();
		FirstNameField.sendKeys(name);
		automation.Report("input first name : " + name);
	}
	
	public void InputLastName(String name) {
		LastNameField.clear();
		LastNameField.sendKeys(name);
		automation.Report("input last name : " + name);
	}
	
	public void InputStreetAddress(String address) {
		StreetAddressField.clear();
		StreetAddressField.sendKeys(address);
		automation.Report("input street address : " + address);
	}
	
	public void InputAddressLine2(String address) {
		AddressLine2Field.clear();
		AddressLine2Field.sendKeys(address);
		automation.Report("input address line 2 : " + address);
	}
	
	public void InputCity(String city) {
		CityField.clear();
		CityField.sendKeys(city);
		automation.Report("input city : " + city);
	}
	
	public void SelectState(String state) {
		Select stateSelectBox = new Select(StateSelectBox);
		stateSelectBox.selectByVisibleText(state);
		automation.Report("input state : " + state);
	}
	
	public void InputZipCode(String code) {
		ZipCodeField.clear();
		ZipCodeField.sendKeys(code);
		automation.Report("input zip code : " + code);
	}
	
	public void InputPhoneNumber(String phone) {
		PhoneNumberField.clear();
		PhoneNumberField.sendKeys(phone);
		automation.Report("input phone : " + phone);
	}
	
	public void InputEmailAddress(String email) {
		EmailAddressField.clear();
		EmailAddressField.sendKeys(email);
		automation.Report("input email : " + email);
	}
	
	public void SelectDate(String date, String month, String year) {
		CalendarField.clear();
		if(date != null && month != null && year != null && date.isEmpty() == false && month.isEmpty() == false && year.isEmpty() == false ) {
			
			automation.mouseClickElement(CalendarImg);
			
			Select yearSelectBox = new Select(CalendarYearSelectBox);
			yearSelectBox.selectByVisibleText(year);
			
			String[] months = {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};
			String currentMonth = CalendarMonthField.getText().trim().toString();
			int currentMonthIndex = ArrayUtils.indexOf(months, currentMonth);
			int monthIndex = ArrayUtils.indexOf(months, month);
			
			if(monthIndex <= -1) {
				String error = "month input wrong - month : " + month;
				automation.Report(error);
				Assert.fail(error);
			}
			
			if(currentMonthIndex < monthIndex) {
				int numbersOfNext = monthIndex - currentMonthIndex;
				for(int i = 1; i <= numbersOfNext; i++) {
					CalendarMonthNextButton.click();
					try {
						Thread.sleep(1000);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
			else {
				int numbersOfPrevious = currentMonthIndex - monthIndex;
				for(int i = 1; i <= numbersOfPrevious; i++) {
					CalendarMonthPreviousButton.click();
					try {
						Thread.sleep(1000);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			}
			
			WebElement DatePicker = CalendarDatePicker.findElement(By.xpath(".//*[contains(text(),'" + date + "')]"));
			automation.mouseClickElement(DatePicker);
			automation.Report("select date : " + date + " - month : " + month + " - year : " + year);
		}

	}
	
	public void ClickSubmitButton() {
		if(SubmitButton.isEnabled()) {
			automation.mouseClickElement(SubmitButton);
			automation.Report("click Submit button");
		}
		else {
			String error = "Failed - Submit button is disable";
			automation.Report(error);
			Assert.fail(error);
		}
	}
}
