import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonMssgBar } from './common-mssg-bar';

describe('CommonMssgBar', () => {
  let component: CommonMssgBar;
  let fixture: ComponentFixture<CommonMssgBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonMssgBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonMssgBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
