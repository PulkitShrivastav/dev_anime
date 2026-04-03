import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorComp } from './error-comp';

describe('ErrorComp', () => {
  let component: ErrorComp;
  let fixture: ComponentFixture<ErrorComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
