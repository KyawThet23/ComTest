package com.mit.first.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mit.first.ds.Order;
import com.mit.first.ds.OrderedItem;
import com.mit.first.payload.OrderDto;
import com.mit.first.payload.PlaceOrder;
import com.mit.first.repository.OrderRepo;
import com.mit.first.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService{

	@Autowired
	private OrderRepo repo;
	@Autowired
	private ModelMapper mapper;
	
	private String generateOrderId(){
		
		UUID uuid = UUID.randomUUID();
		String code = String.format("%03d", Math.abs(uuid.getLeastSignificantBits() % 1000));
		return code;
    }
	
	private OrderDto entityToDto(Order entity) {
		
		OrderDto respone = mapper.map(entity, OrderDto.class);
		
		return respone;
	}
	
	@Override
	public List<OrderDto> getAllOrder() {
		List<Order> orders = repo.findAll();
		return orders.stream()
				.map(order ->  entityToDto(order))
				.collect(Collectors.toList());
	}

	@Override
	public List<OrderDto> findByDate(LocalDate date) {
		
		List<Order> orders = repo.findAllByOrderDate(date);
		
		return orders.stream()
				.map(order -> entityToDto(order))
				.collect(Collectors.toList());
	}

	@Override
	public List<OrderDto> findByCode(String code) {
		
		List<Order> orders = repo.findAllByCode(code);
		
		return orders.stream()
				.map(order -> entityToDto(order))
				.collect(Collectors.toList());
	}

	@Override
	@Transactional
	public void placeOrder(PlaceOrder request) {
		
		Order order = request.getOrder();
		order.setCode(generateOrderId());
		order.setOrderDate(LocalDate.now());
		
		List<OrderedItem> items = request.getOrderItems();
		items.forEach(item -> order.addOrderItem(item));
		
		repo.save(order);
		
	}

	@Override
	public void deleteById(int id) {

		repo.deleteById(id);
	}
}

