import { TestBed } from '@angular/core/testing';

import { GlobServiceService } from './glob-service';

describe('GlobServiceService', () => {
  let service: GlobServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
