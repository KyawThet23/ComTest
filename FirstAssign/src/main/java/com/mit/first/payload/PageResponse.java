package com.mit.first.payload;

import java.util.List;

import com.mit.first.ds.Product;

import lombok.Data;

@Data
public class PageResponse<T> {
	
	private List<Product> data;
	private PageModal page; 
	
}
