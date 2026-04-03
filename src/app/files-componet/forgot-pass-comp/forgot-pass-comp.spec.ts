import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPassComp } from './forgot-pass-comp';

describe('ForgotPassComp', () => {
  let component: ForgotPassComp;
  let fixture: ComponentFixture<ForgotPassComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgotPassComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPassComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
