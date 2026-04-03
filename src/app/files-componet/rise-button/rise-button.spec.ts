import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiseButton } from './rise-button';

describe('RiseButton', () => {
  let component: RiseButton;
  let fixture: ComponentFixture<RiseButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiseButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiseButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
