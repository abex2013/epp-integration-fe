import { TestBed } from '@angular/core/testing';

import { AddClientStateService } from './add-client-state.service';

describe('AddClientStateService', () => {
  let service: AddClientStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddClientStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
