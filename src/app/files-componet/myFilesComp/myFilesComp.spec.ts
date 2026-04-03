import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFilesComp } from './myFilesComp';

describe('MyFilesComp', () => {
  let component: MyFilesComp;
  let fixture: ComponentFixture<MyFilesComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFilesComp]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyFilesComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
