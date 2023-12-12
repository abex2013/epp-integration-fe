import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimesheetConfiguration } from '../../models/timesheetModels';
import { TimesheetService } from '../services/timesheet.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetConfigurationStateService {
  private timesheetConfigurationSource = new BehaviorSubject<TimesheetConfiguration>({
    WorkingDays: [],
    WorkingHour: 0
  });
  timesheetConfiguration$ = this.timesheetConfigurationSource.asObservable();

  constructor(private timesheetService: TimesheetService) { }

  getTimesheetConfiguration() {
    this.timesheetService.getTimeSheetConfiguration().subscribe(response => {
      var timesheetConfig = response ?? {
        WorkingHour: [],
        WorkingDays: 0
      }

      this.timesheetConfigurationSource.next(timesheetConfig);
    });
  }
}
