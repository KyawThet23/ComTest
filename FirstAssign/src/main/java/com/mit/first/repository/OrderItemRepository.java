package com.mit.first.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mit.first.ds.OrderedItem;

public interface OrderItemRepository extends JpaRepository<OrderedItem, Integer>{

}
