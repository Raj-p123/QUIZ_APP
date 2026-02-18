import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectAnalytics } from './subject-analytics';

describe('SubjectAnalytics', () => {
  let component: SubjectAnalytics;
  let fixture: ComponentFixture<SubjectAnalytics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectAnalytics]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectAnalytics);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
