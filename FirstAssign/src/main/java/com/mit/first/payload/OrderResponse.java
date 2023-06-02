package com.mit.first.payload;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class OrderResponse {

	 private String name;
	 private int id;
	 private String code;
	 private LocalDate orderDate;
	 private double totalPrice;
	 private int totalQty;
	 private LocalDate lastDate;
}
