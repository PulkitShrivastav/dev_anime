import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesComp } from './files-comp';

describe('FilesComp', () => {
  let component: FilesComp;
  let fixture: ComponentFixture<FilesComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
