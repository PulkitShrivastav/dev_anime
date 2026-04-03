import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFileComp } from './new-file-comp';

describe('NewFileComp', () => {
  let component: NewFileComp;
  let fixture: ComponentFixture<NewFileComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFileComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFileComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
