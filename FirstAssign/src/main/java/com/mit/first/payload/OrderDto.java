package com.mit.first.payload;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;


import lombok.Data;

@Data
public class OrderDto {
	
	private Integer id;
	private String code;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate orderDate;
	private float totalPrice;
	private float toalqty;
	private LocalDate lastDate;
}
