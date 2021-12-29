package automationcodingproject.Httpconnection;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.ProtocolException;
import java.net.URL;
import java.util.Scanner;

import org.testng.Assert;

import automationcodingproject.core.Automation;

public class HttpConnection {
	
	URL url = null;
	HttpURLConnection conn = null;
	String APIKey = "";
	String method = "";
	String uri = "";
	Automation automation;
	
	public HttpConnection(String uri, String apiKey, String method) {
		this.APIKey = apiKey;
		this.uri = uri;
		this.method = method;
		automation = Automation.getInstance();
	}
	
	public HttpURLConnection create() {
		try {
			url = new URL(this.uri);
			conn = (HttpURLConnection) url.openConnection();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    try {
			conn.setRequestMethod(this.method);
			//conn.setRequestProperty("x-api-key", this.APIKey);
		} catch (ProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    return conn;
	}
	
	public String handleRespone() {
		try {
			if (conn.getResponseCode() != 200) {
				String message = "HTTP error code : conn.getResponseCode()";
				automation.Report(message);
				Assert.fail(message);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	    Scanner scan = null;
		try {
			scan = new Scanner(url.openStream());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	    String entireResponse = new String();
	    while (scan.hasNext()) {
	    	entireResponse += scan.nextLine();
	    }
	    scan.close();
	    return entireResponse;
	}
	
}
