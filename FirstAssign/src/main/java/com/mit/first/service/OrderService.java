package com.mit.first.service;

import java.time.LocalDate;
import java.util.List;

import com.mit.first.payload.OrderDto;
import com.mit.first.payload.PlaceOrder;

public interface OrderService {

	List<OrderDto> getAllOrder();

	List<OrderDto> findByDate(LocalDate date);

	List<OrderDto> findByCode(String code);

	void placeOrder(PlaceOrder request);

	void deleteById(int id);

}
