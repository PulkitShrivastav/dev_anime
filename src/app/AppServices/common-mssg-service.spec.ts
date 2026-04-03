import { TestBed } from '@angular/core/testing';

import { CommonMssgService } from './common-mssg-service';

describe('CommonMssgService', () => {
  let service: CommonMssgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonMssgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
