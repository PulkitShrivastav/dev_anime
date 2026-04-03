import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileControlComp } from './file-control-comp';

describe('FileControlComp', () => {
  let component: FileControlComp;
  let fixture: ComponentFixture<FileControlComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileControlComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileControlComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
