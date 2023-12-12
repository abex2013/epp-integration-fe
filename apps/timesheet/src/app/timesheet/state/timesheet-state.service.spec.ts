import { TestBed } from '@angular/core/testing';

import { TimesheetStateService } from './timesheet-state.service';

describe('TimesheetStateService', () => {
  let service: TimesheetStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheetStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
