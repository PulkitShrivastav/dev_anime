import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditButtonsComp } from './edit-buttons-comp';

describe('EditButtonsComp', () => {
  let component: EditButtonsComp;
  let fixture: ComponentFixture<EditButtonsComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditButtonsComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditButtonsComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
