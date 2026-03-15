import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizType } from './quiz-type';

describe('QuizType', () => {
  let component: QuizType;
  let fixture: ComponentFixture<QuizType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
