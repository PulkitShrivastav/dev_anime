import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsTo } from './buttons-to';

describe('ButtonsTo', () => {
  let component: ButtonsTo;
  let fixture: ComponentFixture<ButtonsTo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonsTo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsTo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
