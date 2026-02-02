package com.quizapp.quiz_backend.controller;

import com.quizapp.quiz_backend.dto.CategoryRequest;
import com.quizapp.quiz_backend.model.Category;
import com.quizapp.quiz_backend.service.CategoryService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teacher/categories")
@CrossOrigin(origins = "*")
public class TeacherCategoryController {

    private final CategoryService categoryService;

    public TeacherCategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public Category createCategory(@RequestBody CategoryRequest request) {
        return categoryService.createCategory(request);
    }
}
