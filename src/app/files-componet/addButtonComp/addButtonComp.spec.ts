import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddButtonComp } from './addButtonComp';

describe('AddButtonComp', () => {
  let component: AddButtonComp;
  let fixture: ComponentFixture<AddButtonComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddButtonComp]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddButtonComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
