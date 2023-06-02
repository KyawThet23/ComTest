package com.mit.first.payload;

import java.util.List;

import com.mit.first.ds.OrderedItem;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewOrderItem {
		
	private int totalQty;
	private float totalPrice;
	private List<OrderedItem> items;
}
