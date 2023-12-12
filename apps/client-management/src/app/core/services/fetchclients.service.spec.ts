import { TestBed } from '@angular/core/testing';

import { FetchclientsService } from './fetchclients.service';

describe('FetchclientsService', () => {
  let service: FetchclientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchclientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
