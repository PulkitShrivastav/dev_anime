import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanpatiAnime } from './ganpati-anime';

describe('GanpatiAnime', () => {
  let component: GanpatiAnime;
  let fixture: ComponentFixture<GanpatiAnime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanpatiAnime]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GanpatiAnime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
