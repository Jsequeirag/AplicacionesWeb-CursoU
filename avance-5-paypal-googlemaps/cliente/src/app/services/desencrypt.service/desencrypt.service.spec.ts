import { TestBed } from '@angular/core/testing';

import { DesencryptService } from './desencrypt.service';

describe('DesencryptService', () => {
  let service: DesencryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesencryptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
