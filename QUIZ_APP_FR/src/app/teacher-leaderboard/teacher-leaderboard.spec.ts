import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLeaderboard } from './teacher-leaderboard';

describe('TeacherLeaderboard', () => {
  let component: TeacherLeaderboard;
  let fixture: ComponentFixture<TeacherLeaderboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherLeaderboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherLeaderboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
