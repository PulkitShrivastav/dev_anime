import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesComponet } from './files-componet';

describe('FilesComponet', () => {
  let component: FilesComponet;
  let fixture: ComponentFixture<FilesComponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesComponet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesComponet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
