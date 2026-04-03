import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpComp } from './popUpComp';

describe('PopUpComp', () => {
  let component: PopUpComp;
  let fixture: ComponentFixture<PopUpComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpComp]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PopUpComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
