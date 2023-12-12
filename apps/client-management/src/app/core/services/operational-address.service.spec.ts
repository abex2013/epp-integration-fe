import { TestBed } from '@angular/core/testing';

import { OperationalAddressService } from './operational-address.service';

describe('OperationalAddressService', () => {
  let service: OperationalAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationalAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
