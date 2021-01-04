import { TestBed } from '@angular/core/testing';

import { GlobService } from './glob-service';

describe('GlobServiceService', () => {
  let service: GlobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
