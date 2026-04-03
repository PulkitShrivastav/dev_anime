import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyOTPComp } from './verify-otpcomp';

describe('VerifyOTPComp', () => {
  let component: VerifyOTPComp;
  let fixture: ComponentFixture<VerifyOTPComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyOTPComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyOTPComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
