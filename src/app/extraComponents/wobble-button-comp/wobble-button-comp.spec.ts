import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WobbleButtonComp } from './wobble-button-comp';

describe('WobbleButtonComp', () => {
  let component: WobbleButtonComp;
  let fixture: ComponentFixture<WobbleButtonComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WobbleButtonComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WobbleButtonComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
