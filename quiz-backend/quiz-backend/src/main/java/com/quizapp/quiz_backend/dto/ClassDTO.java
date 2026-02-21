package com.quizapp.quiz_backend.dto;

public class ClassDTO {

    private Long id;
    private String className;
    private String teacherName;
    private String classCode;
    private int totalQuizzes;

    public ClassDTO(Long id,
                    String className,
                    String teacherName,
                    String classCode,
                    int totalQuizzes) {

        this.id = id;
        this.className = className;
        this.teacherName = teacherName;
        this.classCode = classCode;
        this.totalQuizzes = totalQuizzes;
    }

    public Long getId() { return id; }
    public String getClassName() { return className; }
    public String getTeacherName() { return teacherName; }
    public String getClassCode() { return classCode; }
    public int getTotalQuizzes() { return totalQuizzes; }
}
