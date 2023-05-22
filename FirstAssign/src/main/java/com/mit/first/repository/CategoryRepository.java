package com.mit.first.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mit.first.ds.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
