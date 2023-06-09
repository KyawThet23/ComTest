package com.mit.first.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mit.first.ds.Category;
import com.mit.first.ds.Product;
import com.mit.first.payload.FileHelper;
import com.mit.first.payload.ProductDto;
import com.mit.first.repository.CategoryRepository;
import com.mit.first.repository.ProductRepository;
import com.mit.first.service.ExcelService;
import com.mit.first.service.ProductService;

@RestController
@RequestMapping("/product")
public class ProductController {
	
	@Autowired
	private ProductService productService;
	@Autowired
	private ExcelService excelService;
	@Autowired
	private ProductRepository repo;
	@Autowired
	private CategoryRepository catRepo;

	@PostMapping("/create")
	public String create(@RequestBody ProductDto dto){
		productService.createProduct(dto);
		return "Created successfully";
	}
	
	@GetMapping("/all")
	public List<ProductDto> getAllProduct(){
		return productService.getAllClass();
	}
	
	@GetMapping("/{id}")
	public List<ProductDto> getByCategoryId(@PathVariable int id){
		return productService.getProductByCatId(id);
	}
	
	@GetMapping("/name/{name}")
	public List<ProductDto> getByName(@PathVariable String name){
		return productService.getByProductName(name);
	}
	
	@GetMapping("/excel")
	public ResponseEntity<Resource> getExcelFile(){
		
		String filename = "products.xlsx";
		InputStreamResource file = new InputStreamResource(excelService.loadProduct());
		
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
				.contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
		        .body(file);
	}
	
	@PostMapping("/data")
	public ResponseEntity<String> getData(@RequestParam("file") MultipartFile file){
		
		if (FileHelper.hasExcelFormat(file)) {
			try {
				
				try {
					
					Workbook workbook = new XSSFWorkbook(file.getInputStream());
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
			            product.setBrand(row.getCell(1).getStringCellValue());
			            product.setName(row.getCell(2).getStringCellValue());
			            product.setPrice((float)row.getCell(3).getNumericCellValue());
			            product.setQuantity((int)row.getCell(4).getNumericCellValue());
			            
			            //set the value for category
			            int catId = (int)row.getCell(5).getNumericCellValue();
			            Category category = catRepo.findById(catId).orElse(null);
			            product.setCategory(category);
			            
			            products.add(product);
			            repo.saveAll(products);
					}
					
					workbook.close();
			
					
				} catch (IOException e) {
					throw new RuntimeException("Fail to import data into excel file" + e.getMessage());
				}
				
//				excelService.saveProduct(file);
				return ResponseEntity.status(HttpStatus.OK)
						.body("Excel file import successfully!");
				
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
						.body("Couldn't upload the file" + file.getOriginalFilename());
			}
		}
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("Please upload excel file");
		
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteById(@PathVariable int id) {
		
		productService.deleteByid(id);
	}

}





