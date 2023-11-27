import { TestBed } from '@angular/core/testing';

import { TheateronboardService } from './theateronboard.service';

describe('TheateronboardService', () => {
  let service: TheateronboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheateronboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
