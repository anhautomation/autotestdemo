package automationcodingproject.utilities;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class Excel {

	protected String _root = System.getProperty("dir");
	protected String _filePath;
	protected File _file;
	protected XSSFWorkbook _workBook;
	protected XSSFSheet _sheet;

	public Excel(String path) {
		_filePath = path;
		_file = new File(_filePath);
		if (!isFileExist()) {
			createExcel();
		}
	}

	public boolean isFileExist() {
		if (_file.exists())
			return true;
		else {
			return false;
		}
	}

	public void createExcel() {
		_file.getParentFile().mkdirs();
		_workBook = new XSSFWorkbook();
	}

	public void open() throws IOException {
		if (!isFileExist()) {
			_file = new File(_filePath);
		}
		if (_file.canRead()) {
			FileInputStream streamIn = new FileInputStream(_file);
			_workBook = new XSSFWorkbook(streamIn);
			streamIn.close();
		}
	}

	public void selectSheet(String SheetName) {
		_sheet = _workBook.getSheet(SheetName);
		if (!isSheet(SheetName)) {
			_sheet = _workBook.createSheet(SheetName);
		}
	}

	public boolean isSheet(String SheetName) {
		return _workBook.getSheetIndex(SheetName) >= 0;
	}

	public void addSheet(String SheetName) {
		if (!isSheet(SheetName)) {
			_workBook.createSheet(SheetName);
		}
	}

	// Remove a sheet
	public void removeSheet(int SheetIndex) {
		_workBook.removeSheetAt(SheetIndex);
	}

	public void removeSheet(String SheetName) {
		int index = _workBook.getSheetIndex(SheetName);
		removeSheet(index);
	}

	// add column
	public void addColumn(XSSFSheet sheet, String ColName) {
		ColName = ColName.toUpperCase();

		XSSFCellStyle style = _workBook.createCellStyle();
		style.setFillForegroundColor(HSSFColor.GREY_40_PERCENT.index);
		style.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);

		XSSFRow row = sheet.getRow(0);
		if (row == null)
			row = sheet.createRow(0);

		XSSFCell cell;
		if (row.getLastCellNum() == -1)
			cell = row.createCell(0);
		else
			cell = row.createCell(row.getLastCellNum());

		cell.setCellValue(ColName);
		cell.setCellStyle(style);
	}

	public void addColumn(String ColName) {
		addColumn(_sheet, ColName);
	}

	public int selectColumnIndex(String columnName) {
		columnName = columnName.toUpperCase();
		XSSFRow row = _sheet.getRow(0);
		try {
			int colNum = row.getPhysicalNumberOfCells();
			// Find column index
			for (int inx = 0; inx < colNum; inx++) {
				XSSFCell cell = row.getCell(inx);
				if (cell != null) {
					if (cell.getCellType() == Cell.CELL_TYPE_STRING
							&& cell.getStringCellValue().equalsIgnoreCase(
									columnName)) {
						return inx;
					}
				}
			}
			return -1;
		} catch (Exception e) {
			return -1;
		}
	}

	public List<String> getColumnData(String columnName) {
		int colIndex = getColumnIndex(columnName);
		if(colIndex < 0){
			return null;
		}
		String data = "";
		List<String> dataList = new ArrayList<String>();
		Iterator<Row> rows = _sheet.rowIterator();
		rows.next();
		int col = 0;
		while (rows.hasNext()) {
			Iterator<Cell> cells = ((XSSFRow) rows.next()).cellIterator();
			while (cells.hasNext()) {
				XSSFCell cell = (XSSFCell) cells.next();
				col = cell.getColumnIndex();
				if (col == colIndex) {
					DataFormatter df = new DataFormatter();
					data = df.formatCellValue(cell);
					if (!data.isEmpty() && !data.equalsIgnoreCase("")) {
						dataList.add(data);
					}
				}
			}
		}
		return dataList;
	}

	public void setCell(int rowIndex, int colIndex, String value) {
		XSSFRow row = selectRow(rowIndex);
		XSSFCell cell = selectCell(row, colIndex);
		cell.setCellValue(value);
		_sheet.autoSizeColumn(colIndex);
	}

	public XSSFRow selectRow(int rowIndex) {
		XSSFRow row = _sheet.getRow(rowIndex);
		if (row == null) {
			row = _sheet.createRow(rowIndex);
		}
		return row;
	}

	public XSSFCell selectCell(XSSFRow row, int colIndex) {
		XSSFCell cell = row.getCell(colIndex);
		if (cell == null) {
			cell = row.createCell(colIndex);
		}
		return cell;
	}
	
	public String getCellValue(int rowIndex, int colIndex) {
		XSSFRow row = selectRow(rowIndex);
		XSSFCell cell = selectCell(row, colIndex);
		FormulaEvaluator evaluator = _workBook.getCreationHelper().createFormulaEvaluator();

		if (cell != null) {
			switch (evaluator.evaluateInCell(cell).getCellType()) {
			case Cell.CELL_TYPE_STRING:
				return cell.getStringCellValue();
			case Cell.CELL_TYPE_NUMERIC:
				return String.valueOf(cell.getNumericCellValue());
			case Cell.CELL_TYPE_BLANK:
				return "";
			case Cell.CELL_TYPE_BOOLEAN:
				return String.valueOf(cell.getBooleanCellValue());
			case Cell.CELL_TYPE_ERROR:
				return String.valueOf(cell.getErrorCellString());
			case Cell.CELL_TYPE_FORMULA:
				return String.valueOf(cell.getCellFormula());
			}
		}
		return null;
	}

	public void save() throws IOException {
		FileOutputStream streamOut = new FileOutputStream(_filePath);
		_workBook.write(streamOut);
		streamOut.flush();
		streamOut.close();
	}
	
	public int countTotalColumn() throws Exception {
//		String data = "";
		Iterator<Row> rows = _sheet.rowIterator();
		XSSFRow row = (XSSFRow) rows.next();
		short lastCellNum = row.getLastCellNum();
		int[] dataCount = new int[lastCellNum];
		rows = _sheet.rowIterator();
		rows.next();
		int col = 0;
		while (rows.hasNext()) {
			Iterator<Cell> cells = ((XSSFRow) rows.next()).cellIterator();
			while (cells.hasNext()) {
				XSSFCell cell = (XSSFCell) cells.next();
				col = cell.getColumnIndex();
                dataCount[col] += 1;
//				DataFormatter df = new DataFormatter();
//				data = df.formatCellValue(cell);
			}
		}
		return dataCount.length;
	}

	public ArrayList<ArrayList<String>> getTableData(){
		String data = "";
		ArrayList<String> dataList;
		ArrayList<ArrayList<String>> table = new ArrayList<ArrayList<String>>();
		Iterator<Row> rows = _sheet.rowIterator();
		rows = _sheet.rowIterator();
		rows.next();
		while (rows.hasNext()) {
			Iterator<Cell> cells = ((XSSFRow) rows.next()).cellIterator();
			dataList = new ArrayList<String>();
			while (cells.hasNext()) {
				XSSFCell cell = (XSSFCell) cells.next();
				DataFormatter df = new DataFormatter();
				data = df.formatCellValue(cell);
				dataList.add(data);
			}
			table.add(dataList);
		}
		return table;
	}
	
	public int getColumnIndex(String columnName) {
		columnName = columnName.toUpperCase();
		XSSFRow row = _sheet.getRow(0);
		try{
			int colNum = row.getPhysicalNumberOfCells();
			// Find column index
			for (int inx = 0; inx < colNum; inx++) {
				XSSFCell cell = row.getCell(inx);
				if (cell != null) {
					if (cell.getCellType() == Cell.CELL_TYPE_STRING
							&& cell.getStringCellValue().equalsIgnoreCase(
									columnName)) {
						return inx;
					}
				}
			}
			return -1;
		}catch(Exception e){
			return -1;
		}
	}
}
