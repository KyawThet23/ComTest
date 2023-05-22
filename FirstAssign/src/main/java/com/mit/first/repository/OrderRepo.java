package com.mit.first.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mit.first.ds.Order;

public interface OrderRepo extends JpaRepository<Order, Integer> {

	List<Order> findAllByOrderDate(LocalDate date);

	List<Order> findAllByCode(String code);

}
