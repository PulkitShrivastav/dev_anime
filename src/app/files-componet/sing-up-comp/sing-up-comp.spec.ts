import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpComp } from './sing-up-comp';

describe('SingUpComp', () => {
  let component: SingUpComp;
  let fixture: ComponentFixture<SingUpComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingUpComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingUpComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
