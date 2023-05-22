package com.mit.first.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mit.first.payload.IdProductDto;
import com.mit.first.payload.OrderDto;
import com.mit.first.payload.PlaceOrder;
import com.mit.first.service.OrderService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;


@RestController
@RequestMapping("/order")
public class OrderController {	
	
	@Autowired
	private OrderService service;
	@Autowired
	private EntityManager entityManager;
	
	@PostMapping("/create")
	public String createOrder(@RequestBody PlaceOrder request) {
		
		service.placeOrder(request);
		
		return "Order create successfully";
	}
	
	@GetMapping("/all")
	public List<OrderDto> getAllOrder(){
		
		return service.getAllOrder();
	}
	
//	<-- Query to find order's product in sql-->
//	select product.name , product.price , order_item.quantity from order_ 
//	join order_item on order_.id= order_item.order_id 
//	join product on product.id= order_item.product_id 
//	where order_.id = 1
	@GetMapping("/products/{id}")
	public List<IdProductDto[]> getProductByOrderid(@PathVariable int id){
		
		String script = "SELECT p.name, p.price, op.quantity , o.totalPrice "
				+ "FROM Order o "
				+ "JOIN OrderedItem op ON o.id =op.order.id "
				+ "JOIN Product p ON p.id = op.productId "
				+ "WHERE o.id = :id ";
		Query query = entityManager.createQuery(script);
		query.setParameter("id", id);
		@SuppressWarnings("unchecked")
		List<IdProductDto[]> result = query.getResultList();
		return result;
	}
	
	@GetMapping("/date/{date}")
	public List<OrderDto> findByDate (@PathVariable LocalDate date) {
		
		return service.findByDate(date);
	}
	
	@GetMapping("/code/{code}")
	public List<OrderDto> findByCode (@PathVariable String code){
		
		return service.findByCode(code);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteById (@PathVariable int id) {
		
		service.deleteById(id);
	}
	
}
