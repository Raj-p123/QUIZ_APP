import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMyQuizzes } from './teacher-my-quizzes';

describe('TeacherMyQuizzes', () => {
  let component: TeacherMyQuizzes;
  let fixture: ComponentFixture<TeacherMyQuizzes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherMyQuizzes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherMyQuizzes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
