import { TestBed } from '@angular/core/testing';

import { TimesheetConfigurationStateService } from './timesheet-configuration-state.service';

describe('TimesheetConfigurationStateService', () => {
  let service: TimesheetConfigurationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheetConfigurationStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
