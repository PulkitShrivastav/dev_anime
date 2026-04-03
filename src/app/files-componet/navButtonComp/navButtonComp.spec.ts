import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavButtonComp } from './navButtonComp';

describe('NavButtonComp', () => {
  let component: NavButtonComp;
  let fixture: ComponentFixture<NavButtonComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavButtonComp]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavButtonComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
