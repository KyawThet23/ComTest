package com.mit.first.service;

import java.util.List;
import java.util.Set;

import com.mit.first.ds.Product;
//import com.mit.first.payload.PageResponse;
import com.mit.first.payload.ProductDto;

public interface ProductService {

	ProductDto createProduct(ProductDto dto);

	List<ProductDto> getAllClass();

	List<ProductDto> getProductByCatId(int id);

	List<ProductDto> getByProductName(String name);

	Set<Product> getAllByIds(Set<Integer> ids);

	void deleteByid(int id);

}
