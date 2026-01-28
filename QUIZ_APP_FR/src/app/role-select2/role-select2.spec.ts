import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSelect2 } from './role-select2';

describe('RoleSelect2', () => {
  let component: RoleSelect2;
  let fixture: ComponentFixture<RoleSelect2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleSelect2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleSelect2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
