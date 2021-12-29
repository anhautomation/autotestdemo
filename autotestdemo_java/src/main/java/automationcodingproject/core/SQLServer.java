package automationcodingproject.core;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Properties;

import org.testng.SkipException;

import automationcodingproject.utilities.Excel;

public class SQLServer {
	
	protected String connectionStr ;
	protected String driver ;
	protected String user ;
	protected String password ;
	protected Properties config ;
	
	public SQLServer(){
		loadConfiguration();
		connectionStr = config.getProperty("database.connectionStr");
		driver = config.getProperty("database.driver");
		user = config.getProperty("database.user");
		password = config.getProperty("database.password");
	}
	
	private void loadConfiguration() {
		FileInputStream settingFile;
		try {
			settingFile = new FileInputStream(System.getProperty("user.dir") + "\\Setting.properties");
			config = new Properties();
			config.load(settingFile);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/** 
	 * execute query string
	 * */
	public ResultSet executeQueryString(String query) throws ClassNotFoundException, SQLException{
		Statement st=null;
		Connection con = null;
		ResultSet rs = null;

		Class.forName(driver);
		con = DriverManager.getConnection(connectionStr, user, password);
		st = con.createStatement();
		rs = st.executeQuery(query);
		System.out.println("execute query : " + query);
		return rs;
	}
	
	public ResultSet executeStoreProcedure(String store, ArrayList<ArrayList<String>> parameters) throws ClassNotFoundException, SQLException {
		CallableStatement cStmt=null;
		Connection con = null;
		ResultSet rs = null;

		Class.forName(driver);
		con = DriverManager.getConnection(connectionStr, user, password);
		cStmt = con.prepareCall(store);

		for (int i = 0; i < parameters.size(); i++) {
			ArrayList<String> parameter = parameters.get(i);
			String dataType = parameter.get(0).toLowerCase();
			switch (dataType) {
			case "string":
				cStmt.setString((i+1), parameter.get(1));
				break;
			case "int":
				cStmt.setInt((i+1), Integer.parseInt(parameter.get(1)));
				break;
			default:
				throw new SkipException("cannot execute store paramter with paramter : data type  " + dataType);
			}
		}
		cStmt.execute();
		System.out.println("execute store procedure : " + store);
		rs = cStmt.getResultSet();
		return rs;
	}
	
	/** 
	 * write data to excel file
	 * */
	public void saveDataIntoExcel(ResultSet rs, String FilePath, String SheetName) throws SQLException, IOException{
		ResultSetMetaData rsmd = rs.getMetaData();
		Excel excelProcessor = new Excel(FilePath);
		excelProcessor.open();
		if (excelProcessor.isSheet(SheetName)){
			excelProcessor.removeSheet(SheetName);
		}
		excelProcessor.selectSheet(SheetName);
		for (int i = 1; i <= rsmd.getColumnCount(); i++ ){
			String columnName = rsmd.getColumnName(i);
			
			int columnIndex = excelProcessor.selectColumnIndex(rsmd.getColumnName(i));
			if(columnIndex < 0){
				excelProcessor.addColumn(columnName);
				columnIndex = excelProcessor.selectColumnIndex(rsmd.getColumnName(i));
			}
		}
		
		// Write data to Excel file	
		int i = 1;
		String strData = "";
		while (rs.next()) {
			for (int columnIndex = 0; columnIndex < rsmd.getColumnCount(); columnIndex++){
				strData = rs.getString(rsmd.getColumnName(columnIndex + 1));
				excelProcessor.setCell(i, columnIndex, strData);
			}
			i++;
		}
		excelProcessor.save();
		rs.close();
	}
}
