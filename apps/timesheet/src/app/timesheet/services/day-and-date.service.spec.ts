import { TestBed } from '@angular/core/testing';

import { DayAndDateService } from './day-and-date.service';

describe('DayAndDateService', () => {
  let service: DayAndDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayAndDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
