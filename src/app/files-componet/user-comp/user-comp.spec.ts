import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComp } from './user-comp';

describe('UserComp', () => {
  let component: UserComp;
  let fixture: ComponentFixture<UserComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
