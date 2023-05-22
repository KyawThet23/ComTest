package com.mit.first.payload;

import java.util.List;

import com.mit.first.ds.Order;
import com.mit.first.ds.OrderedItem;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlaceOrder {
	
	private List<OrderedItem> orderItems;
	private Order order;
}
