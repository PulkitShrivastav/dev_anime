import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserControlButtonComp } from './user-control-button-comp';

describe('UserControlButtonComp', () => {
  let component: UserControlButtonComp;
  let fixture: ComponentFixture<UserControlButtonComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserControlButtonComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserControlButtonComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
