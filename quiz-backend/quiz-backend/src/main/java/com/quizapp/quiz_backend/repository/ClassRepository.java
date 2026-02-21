package com.quizapp.quiz_backend.repository;

import com.quizapp.quiz_backend.model.ClassRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassRepository extends JpaRepository<ClassRoom, Long> {

    List<ClassRoom> findByStudents_Id(Long studentId);
}
