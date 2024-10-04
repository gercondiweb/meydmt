import { TestBed } from '@angular/core/testing';

import { CremrestService } from './cremrest.service';

describe('CremrestService', () => {
  let service: CremrestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CremrestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
