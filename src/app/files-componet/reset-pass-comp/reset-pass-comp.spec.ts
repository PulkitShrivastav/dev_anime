import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassComp } from './reset-pass-comp';

describe('ResetPassComp', () => {
  let component: ResetPassComp;
  let fixture: ComponentFixture<ResetPassComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPassComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPassComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
