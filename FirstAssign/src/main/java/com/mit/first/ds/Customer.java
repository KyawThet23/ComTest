package com.mit.first.ds;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String firstName;
	private String lastName;
	private String phone;
	private String email;
	private String address;
	
	@JsonIgnore
	@OneToMany(mappedBy = "customer",
			   cascade = CascadeType.ALL)
	private Set<Order> orders = new HashSet<>();
	
	public void addOrder(Order order) {
		this.orders.add(order);
		order.setCustomer(this);
	}
	
}
