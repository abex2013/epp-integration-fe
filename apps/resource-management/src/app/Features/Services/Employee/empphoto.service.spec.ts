import { TestBed } from '@angular/core/testing';

import { EmpphotoService } from './empphoto.service';

describe('EmpphotoService', () => {
  let service: EmpphotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpphotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
