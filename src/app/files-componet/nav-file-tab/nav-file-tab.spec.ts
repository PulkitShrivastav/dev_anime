import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFileTab } from './nav-file-tab';

describe('NavFileTab', () => {
  let component: NavFileTab;
  let fixture: ComponentFixture<NavFileTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavFileTab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavFileTab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
