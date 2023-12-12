import { TestBed } from '@angular/core/testing';

import { EmergencycontactService } from './emergencycontact.service';

describe('EmergencycontactService', () => {
  let service: EmergencycontactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmergencycontactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
