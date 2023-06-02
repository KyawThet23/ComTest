package com.mit.first.payload;

import lombok.Data;

@Data
public class CustomerDto {
	
	private Integer id;
	private String firstName;
	private String lastName;
	private String phone;
	private String email;
	private String address;
}
