import { TestBed } from '@angular/core/testing';

import { WtwServiceService } from './wtw-service.service';

describe('WtwServiceService', () => {
  let service: WtwServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WtwServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
