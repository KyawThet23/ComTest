package com.mit.first.payload;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import com.mit.first.ds.Category;
import com.mit.first.ds.Product;
import com.mit.first.repository.CategoryRepository;

public class ExcelHelper {
	
	@Autowired
	private static CategoryRepository catRepo;
	
	// To check if excel format
	public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
	
	//For Product
	static String [] productHeaders = {"Id","brand","name","price","quantity","category_id"};
	static String productSheet = "Product";
	
	//import-excel
	public static ByteArrayInputStream productToExcel(List<Product> products) {
		
		try (
			Workbook workbook = new XSSFWorkbook();
			ByteArrayOutputStream out = new ByteArrayOutputStream();
			) {
			
			Sheet sheet = workbook.createSheet(productSheet);
			
			Row headerRow = sheet.createRow(0);
			
			for (int i = 0; i < productHeaders.length; i++) {
				Cell cell = headerRow.createCell(i);
				cell.setCellValue(productHeaders[i]);
			}
			
			int rowIndex = 1;
			
			for (Product pro : products) {
				Row row = sheet.createRow(rowIndex++);
				
				row.createCell(0).setCellValue(pro.getId());
				row.createCell(1).setCellValue(pro.getBrand());
				row.createCell(2).setCellValue(pro.getName());
				row.createCell(3).setCellValue(pro.getPrice());
				row.createCell(4).setCellValue(pro.getQuantity());
				row.createCell(5).setCellValue(pro.getCategory().getId());
			}
			
			workbook.write(out);
			return new ByteArrayInputStream(out.toByteArray());
			
		} catch (IOException e) {
			throw new RuntimeException("Fail to import data into excel file" + e.getMessage());
		}
	}
	
	//to check if excel-file
	public static boolean hasExcelFormat(MultipartFile file) {
		
		if ( !TYPE.equals(file.getContentType())) {
			return false;
		}
		
		return true;
	}
	
	//Upload-excel
	public static List<Product> excelToProduct(InputStream is){
		
		try {
			
			Workbook workbook = new XSSFWorkbook(is);
			Sheet sheet = workbook.getSheetAt(0);
			
			List<Product> products = new ArrayList<Product>();
			
			for (Row row : sheet) {
				
				// Skip the header row
	            if (row.getRowNum() == 0) {
	                continue;
	            }
	            
	            //Create New Product Object
	            Product product = new Product();
	            
	            //Set the value from excel file
	            product.setId((int)row.getCell(0).getNumericCellValue());
	            product.setBrand(row.getCell(1).getStringCellValue());
	            product.setName(row.getCell(2).getStringCellValue());
	            product.setPrice((float)row.getCell(3).getNumericCellValue());
	            product.setQuantity((int)row.getCell(4).getNumericCellValue());
	            
	            //set the value for category
	            int catId = (int)row.getCell(5).getNumericCellValue();
	            Category categoryToSet = catRepo.findById(catId).orElse(null);
	            product.setCategory(categoryToSet);
	            System.out.println(categoryToSet);
	            
	            products.add(product);
			}
			
			workbook.close();
			return products;
			
		} catch (IOException e) {
			throw new RuntimeException("Fail to import data into excel file" + e.getMessage());
		}
		
	}
	
}














