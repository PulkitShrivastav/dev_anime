import { TestBed } from '@angular/core/testing';

import { AppIntiateService } from './app-intiate-service';

describe('AppIntiateService', () => {
  let service: AppIntiateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppIntiateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
