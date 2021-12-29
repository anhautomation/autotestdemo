package automationcodingproject.core;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Properties;

import org.testng.Assert;

import automationcodingproject.core.Automation;
import automationcodingproject.core.StatusReport;

public class Setting {
	protected final static String PROPERTY_FILE = System.getProperty("user.dir") + "/Setting.properties";
	public static Properties CONFIGURATION;
	public Automation automation;
	
	public Setting() throws IOException{
		loadConfiguration();
		automation = new Automation();
	}
	
	public void loadConfiguration() {
		try {
			FileInputStream settingFile = new FileInputStream(PROPERTY_FILE);
			CONFIGURATION = new Properties();
			CONFIGURATION.load(settingFile);
		} catch (IOException e ) {
			automation.Report("cannot find setting file " + PROPERTY_FILE, "", StatusReport.FAILED);
			Assert.fail("cannot find setting file " + PROPERTY_FILE);
		}
	}
	
	public void setConfiguration(String key, String value){	
		OutputStream settingFile;
		try {
			settingFile = new FileOutputStream(PROPERTY_FILE);
			Properties prop = new Properties();
			prop.setProperty(key, value);
			prop.store(settingFile, null);
			settingFile.close();
		} catch (IOException e) {
			automation.Report("cannot find setting file " + PROPERTY_FILE, "", StatusReport.FAILED);
			Assert.fail("cannot find setting file " + PROPERTY_FILE);
		}
	}

	public void setConfiguration(String filePath, String key, String value){
		try {
			Properties prop = new Properties();
			OutputStream output = null;
			output = new FileOutputStream(filePath);
			prop.setProperty(key, value);
			prop.store(output, null);
			output.close();
		} catch (IOException e) {
			automation.Report("cannot find setting file " + PROPERTY_FILE, "", StatusReport.FAILED);
			Assert.fail("cannot find setting file " + PROPERTY_FILE);
		}
	}
	
	
}