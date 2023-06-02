package com.mit.first.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mit.first.ds.Customer;

public interface CutomerRepository extends JpaRepository<Customer, Integer>{
	
	
}
