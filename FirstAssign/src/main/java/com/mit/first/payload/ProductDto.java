package com.mit.first.payload;

import lombok.Data;

@Data
public class ProductDto {
	
	private int id;
	private String brand;
	private String name;
	private float price;
	private int quantity;
	private int catId;
}
