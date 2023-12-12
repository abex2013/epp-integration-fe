import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimeEntry, Timesheet, TimesheetApproval } from '../../models/timesheetModels';
import { TimesheetService } from '../services/timesheet.service';

@Injectable({
  providedIn: 'root'
})
export class TimesheetStateService {
  date: Date = new Date();

  private timesheetSource = new BehaviorSubject<Timesheet | null>(null);
  timesheet$ = this.timesheetSource.asObservable();

  private timeEntriesSource = new BehaviorSubject<TimeEntry[] | null>(null);
  timeEntries$ = this.timeEntriesSource.asObservable();

  private timesheetApprovalsSource = new BehaviorSubject<TimesheetApproval[] | null>(null);
  timesheetApprovals$ = this.timesheetApprovalsSource.asObservable();

  constructor(private timesheetService: TimesheetService) { }

  getTimesheet(userId: string, date?: Date) {
    if(date){
      this.date = date;
    }
    this.timesheetSource.next(null);
    this.timeEntriesSource.next(null);
    this.timesheetApprovalsSource.next(null);
    this.timesheetService.getTimeSheet(userId, this.date).subscribe(response => {
      this.timesheetSource.next(response ?? null);

      if (!response) {
        return;
      }
      
      this.getTimeEntries(response.Guid);

      this.getTimeSheetApproval(response.Guid);

    });
  }

  getTimeEntries(guid: string) {
    this.timesheetService.getTimeEntries(guid).subscribe(response => {
      this.timeEntriesSource.next(response ?? null);
    });
  }

  getTimeSheetApproval(guid: string) {
    this.timesheetService.getTimeSheetApproval(guid).subscribe(response => {
      this.timesheetApprovalsSource.next(response ?? null);
    });
  }

}
