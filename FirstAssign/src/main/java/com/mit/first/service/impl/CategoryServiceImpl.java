package com.mit.first.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mit.first.ds.Category;
import com.mit.first.payload.CategoryDto;
import com.mit.first.repository.CategoryRepository;
import com.mit.first.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{
	
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private CategoryRepository catRepo;
	
	@Override
	public CategoryDto create(CategoryDto request) {
		
		Category category = dtoToCategory(request);
		
		catRepo.save(category);

		CategoryDto dto = entityToDto(category);
		
		return dto;

	}
	
	@Override
	public List<CategoryDto> getAll() {
		
		List<Category> categories = catRepo.findAll();
		
		return categories.stream()
				.map(category -> entityToDto(category))
				.collect(Collectors.toList());
	}
	
	private Category dtoToCategory(CategoryDto fto) {
		Category response = mapper.map(fto, Category.class);
		return response;
	}
	
	private CategoryDto entityToDto(Category entity) {
		CategoryDto dto = mapper.map(entity, CategoryDto.class);
		return dto;
		
	}
	
}
