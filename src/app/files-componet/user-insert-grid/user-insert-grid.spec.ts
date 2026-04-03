import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInsertGrid } from './user-insert-grid';

describe('UserInsertGrid', () => {
  let component: UserInsertGrid;
  let fixture: ComponentFixture<UserInsertGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInsertGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInsertGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
