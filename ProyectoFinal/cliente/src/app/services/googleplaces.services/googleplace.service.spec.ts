import { TestBed } from '@angular/core/testing';

import { GoogleplaceService } from './googleplace.service';

describe('GoogleplaceService', () => {
  let service: GoogleplaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleplaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
