import { TestBed } from '@angular/core/testing';

import { Openfiles } from './openfiles';

describe('Openfiles', () => {
  let service: Openfiles;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Openfiles);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
