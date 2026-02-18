import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreakCard } from './streak-card';

describe('StreakCard', () => {
  let component: StreakCard;
  let fixture: ComponentFixture<StreakCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreakCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreakCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
