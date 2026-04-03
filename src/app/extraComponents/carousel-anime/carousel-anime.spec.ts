import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselAnime } from './carousel-anime';

describe('CarouselAnime', () => {
  let component: CarouselAnime;
  let fixture: ComponentFixture<CarouselAnime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselAnime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselAnime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
