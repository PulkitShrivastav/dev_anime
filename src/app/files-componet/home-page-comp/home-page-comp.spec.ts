import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComp } from './home-page-comp';

describe('HomePageComp', () => {
  let component: HomePageComp;
  let fixture: ComponentFixture<HomePageComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
