package com.mit.first.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.mit.first.ds.Product;
import com.mit.first.payload.ExcelHelper;
import com.mit.first.repository.ProductRepository;

@Service
public class ExcelService {
	
	@Autowired
	private ProductRepository proRepo;
	
	public ByteArrayInputStream loadProduct() {
		
		List<Product> products = proRepo.findAll();
		
		ByteArrayInputStream in = ExcelHelper.productToExcel(products);
		return in;
	}
	
	public void saveProduct(MultipartFile file) {
		
		try {
			
			List<Product> products = ExcelHelper.excelToProduct(file.getInputStream());
			proRepo.saveAll(products);
			
		} catch (IOException e) {
			throw new RuntimeException("Fail to store excel data into mysql" + e.getMessage());
		}
	}

}
