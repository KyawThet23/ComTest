package com.mit.first.service;

import java.util.List;

import com.mit.first.payload.CategoryDto;

public interface CategoryService {

	CategoryDto create(CategoryDto request);

	List<CategoryDto> getAll();

}
