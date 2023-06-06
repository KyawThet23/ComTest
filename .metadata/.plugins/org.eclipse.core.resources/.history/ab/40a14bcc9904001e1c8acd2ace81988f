package com.mit.first.ds;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_")
public class Order {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	private String code;
	private LocalDate orderDate;
	private float totalPrice;
	private int totalQty;
	private LocalDate lastDate;
	
	@JsonIgnore
	@OneToMany(mappedBy = "order",
			   cascade = CascadeType.ALL)
	private  Set<OrderedItem> orderedItems = new HashSet<>();

	public void addOrderItem(OrderedItem item) {
		this.orderedItems.add(item);
		item.setOrder(this);
	}
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "customer_id")
	private Customer customer;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public LocalDate getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(LocalDate orderDate) {
		this.orderDate = orderDate;
	}

	public float getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}

	public int getTotalQty() {
		return totalQty;
	}

	public void setTotalQty(int totalQty) {
		this.totalQty = totalQty;
	}

	public Set<OrderedItem> getOrderedItems() {
		return orderedItems;
	}

	public void setOrderedItems(Set<OrderedItem> orderedItems) {
		this.orderedItems = orderedItems;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public LocalDate getLastDate() {
		return lastDate;
	}

	public void setLastDate(LocalDate lastDate) {
		this.lastDate = lastDate;
	}

	
}
