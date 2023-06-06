package com.mit.first.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemDetail {

	private int productId;
	private int itemId;
	private String productName;
	private double price;
	private int quantity;
}
