package com.mit.first.service;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mit.first.ds.Product;
import com.mit.first.payload.FileHelper;
import com.mit.first.repository.ProductRepository;

@Service
public class ExcelService {
	
	@Autowired
	private ProductRepository proRepo;
	
	public ByteArrayInputStream loadProduct() {
		
		List<Product> products = proRepo.findAll();
		
		ByteArrayInputStream in = FileHelper.productToExcel(products);
		return in;
	}
	
	

}
