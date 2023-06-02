package com.mit.first.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mit.first.ds.Category;
import com.mit.first.ds.Product;
import com.mit.first.exception.ResourceNotFoundException;
//import com.mit.first.payload.PageModal;
//import com.mit.first.payload.PageResponse;
import com.mit.first.payload.ProductDto;
import com.mit.first.repository.CategoryRepository;
import com.mit.first.repository.ProductRepository;
import com.mit.first.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	private ProductRepository repository;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private CategoryRepository catRepo;
	
	@Override
	public ProductDto createProduct(ProductDto dto) {
		
		int id = dto.getCatId();
		
		Category category = catRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
		
		Product product = dtoToEntity(dto);
		product.setCategory(category);
		repository.save(product);
		ProductDto dataTO = entityToDto(product);
		
		return dataTO;
	}
	
	@Override
	public List<ProductDto> getAllClass() {
		
		List<Product> products = repository.findAll();
		
		return products.stream()
				.map(item -> entityToDto(item))
				.collect(Collectors.toList());
	}
	
	@Override
	public List<ProductDto> getProductByCatId(int id) {
		
		List<Product> proList = repository.findAllByCategory_id(id);
		
		return proList.stream()
				.map(item -> entityToDto(item))
				.collect(Collectors.toList());
	}

	@Override
	public List<ProductDto> getByProductName(String name) {
		List<Product> products = repository.findByNameContaining(name);
		return products.stream()
				.map(product -> entityToDto(product))
				.collect(Collectors.toList());
	}
	
	@Override
	public Set<Product> getAllByIds(Set<Integer> ids) {
		
		List<Product> products = repository.findAllById(ids);
		
		Set<Product> productSet = new HashSet<>(products);
		
		return productSet;
	}
	
	
	private Product dtoToEntity(ProductDto dto) {
		
		Product response = mapper.map(dto, Product.class);
		
		return response;
	}
	
	private ProductDto entityToDto (Product product) {
		
		ProductDto dto = mapper.map(product, ProductDto.class);
		
		return dto;
	}

	@Override
	public void deleteByid(int id) {
		
		repository.deleteById(id);
	}

	
}