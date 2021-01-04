import { TestBed } from '@angular/core/testing';

import { ServercallService } from './servercall.service';

describe('ServercallService', () => {
  let service: ServercallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServercallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
