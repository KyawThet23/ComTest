package com.mit.first.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.mit.first.ds.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	public List<Product> findAllByCategory_id(Integer id);

	public List<Product> findByNameContaining(String name);
}
