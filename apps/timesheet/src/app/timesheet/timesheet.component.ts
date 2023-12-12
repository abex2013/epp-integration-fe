import { Component, OnInit, ViewChild } from '@angular/core';
import { DayAndDateService } from "./services/day-and-date.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimesheetService } from './services/timesheet.service';
import { differenceInCalendarDays } from 'date-fns';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { ClickEventType } from '../models/clickEventType';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApprovalStatus, TimeEntry, Timesheet, TimesheetApproval, TimesheetConfiguration } from '../models/timesheetModels';
import { DateColumnEvent, TimeEntryEvent } from '../models/clickEventEmitObjectType';
import { Client } from '../models/client';
import { Project } from '../models/project';
import { Employee } from '../models/employee';

import { NzNotificationPlacement } from "ng-zorro-antd/notification";
//import { retry } from 'rxjs/operators';
import { TimeEntryFormData } from '../models/timeEntryFormData';
import { TimesheetValidationService } from './services/timesheet-validation.service';
import { Observable } from 'rxjs';
import { TimesheetConfigurationStateService } from './state/timesheet-configuration-state.service';
import { TimesheetStateService } from './state/timesheet-state.service';

@Component({
  selector: 'exec-epp-app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent implements OnInit {
  userId: string | null = null;

  timesheetConfig$: Observable<TimesheetConfiguration> = new Observable();
  timesheet$: Observable<Timesheet | null> = new Observable();
  timeEntries$: Observable<TimeEntry[] | null> = new Observable();
  timesheetApprovals$: Observable<TimesheetApproval[] | null> = new Observable();

  constructor(
    private timesheetConfigurationStateService: TimesheetConfigurationStateService,
    private timesheetStateService: TimesheetStateService
  ) {
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
    this.timesheetConfig$ = this.timesheetConfigurationStateService.timesheetConfiguration$;
    this.timesheet$ = this.timesheetStateService.timesheet$;
    this.timeEntries$ = this.timesheetStateService.timeEntries$;
    this.timesheetApprovals$ = this.timesheetStateService.timesheetApprovals$;

    this.timesheetConfigurationStateService.getTimesheetConfiguration();
  }
}
