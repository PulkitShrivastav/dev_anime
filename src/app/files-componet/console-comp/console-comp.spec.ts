import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleComp } from './console-comp';

describe('ConsoleComp', () => {
  let component: ConsoleComp;
  let fixture: ComponentFixture<ConsoleComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsoleComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoleComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
