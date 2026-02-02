package com.quizapp.quiz_backend.service;

import com.quizapp.quiz_backend.dto.CategoryRequest;
import com.quizapp.quiz_backend.model.Category;
import com.quizapp.quiz_backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category createCategory(CategoryRequest request) {

        categoryRepository.findByName(request.getName())
                .ifPresent(c -> {
                    throw new RuntimeException("Category already exists");
                });

        Category category = new Category();
        category.setName(request.getName());
        category.setDescription(request.getDescription());

        return categoryRepository.save(category);
    }
}
