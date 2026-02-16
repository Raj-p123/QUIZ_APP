import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayQuiz } from './play-quiz';

describe('PlayQuiz', () => {
  let component: PlayQuiz;
  let fixture: ComponentFixture<PlayQuiz>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayQuiz]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayQuiz);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
