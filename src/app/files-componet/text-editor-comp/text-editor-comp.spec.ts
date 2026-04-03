import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEditorComp } from './text-editor-comp';

describe('TextEditorComp', () => {
  let component: TextEditorComp;
  let fixture: ComponentFixture<TextEditorComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextEditorComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextEditorComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
