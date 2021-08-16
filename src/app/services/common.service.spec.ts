import { TestBed } from '@angular/core/testing';

import { CommonSvcService } from './common-svc.service';

describe('CommonSvcService', () => {
  let service: CommonSvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonSvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
