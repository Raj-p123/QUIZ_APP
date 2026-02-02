import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEditQuiz } from './teacher-edit-quiz';

describe('TeacherEditQuiz', () => {
  let component: TeacherEditQuiz;
  let fixture: ComponentFixture<TeacherEditQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherEditQuiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherEditQuiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
