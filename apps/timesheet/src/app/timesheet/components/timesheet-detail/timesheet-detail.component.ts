import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzNotificationService, NzNotificationPlacement } from 'ng-zorro-antd/notification';
import { differenceInCalendarDays } from 'date-fns';

import { DateColumnEvent, TimeEntryEvent } from '../../../models/clickEventEmitObjectType';
import { ClickEventType } from '../../../models/clickEventType';
import { Client } from '../../../models/client';
import { Employee } from '../../../models/employee';
import { Project } from '../../../models/project';
import { TimeEntryFormData } from '../../../models/timeEntryFormData';
import { TimesheetConfiguration, Timesheet, TimeEntry, TimesheetApproval, ApprovalStatus } from '../../../models/timesheetModels';
import { DayAndDateService } from '../../services/day-and-date.service';
import { TimesheetValidationService } from '../../services/timesheet-validation.service';
import { TimesheetService } from '../../services/timesheet.service';
import { concat, observable, Observable, queueScheduler, scheduled, Scheduler } from 'rxjs';
import { TimesheetStateService } from '../../state/timesheet-state.service';
import { TimesheetConfigurationStateService } from '../../state/timesheet-configuration-state.service';
import { concatAll, mergeAll } from 'rxjs/operators';

export const startingDateCriteria = {} as {
  isBeforeThreeWeeks: boolean,
  startingDate: Date
}

@Component({
  selector: 'exec-epp-timesheet-detail',
  templateUrl: './timesheet-detail.component.html',
  styleUrls: ['./timesheet-detail.component.scss']
})
export class TimesheetDetailComponent implements OnInit {
  userId: string | null = null;
  clickEventType = ClickEventType.none;
  drawerVisible = false;
  modalVisible = false;
  validateForm!: FormGroup;

  // Used for disabling client and project list when selected for edit.
  disableFromDate = false;
  disableToDate = false;
  disableClient = false;
  disableProject = false;
  timesheetConfig: TimesheetConfiguration = {
    WorkingDays: [],
    WorkingHour: 0
  };
  timesheetConfig$: Observable<TimesheetConfiguration> = new Observable();
  timesheet: Timesheet | null = null;
  timesheet$: Observable<Timesheet | null> = new Observable();
  timeEntries: TimeEntry[] | null = null;
  timeEntries$: Observable<TimeEntry[] | null> = new Observable();
  timesheetApprovals: TimesheetApproval[] | null = [];
  timesheetApprovals$: Observable<TimesheetApproval[] | null> = new Observable();
  timeEntry: TimeEntry | null = null;
  weeklyTotalHours: number = 0;

  invalidEntries: { Date: Date, Message: string }[] = [];

  clients: Client[] | null = null;
  clientsFiltered: Client[] | null = null;
  projects: Project[] | null = null;
  projectsFiltered: Project[] | null = null;
  employee: Employee[] = [];

  formData: TimeEntryFormData = {
    fromDate: new Date(),
    toDate: new Date(),
    client: '', //this.clients,
    project: '', //this.projects
    hours: null,
    note: '',
  };

  dateColumnContainerClass: string = "";
  dateColumnTotalHour: number = 0;
  date: Date;
  curr: Date;
  firstday1: Date;
  lastday1: Date;
  futereDate: any;
  public weekDays: any[] = [];
  parentCount = null;
  nextWeeks = null;
  lastWeeks = null;
  startValue: Date | null = null;
  endValue: Date | null = null;
  isSubmitted: boolean = false;
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  endValue1 = new Date();
  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.date) > 0;

  constructor(
    private fb: FormBuilder,
    private timesheetService: TimesheetService,
    private notification: NzNotificationService,
    private dayAndDateService: DayAndDateService,
    private timesheetValidationService: TimesheetValidationService,
    private timesheetConfigurationStateService: TimesheetConfigurationStateService,
    private timesheetStateService: TimesheetStateService
  ) {
    this.date = this.timesheetStateService.date;
    this.curr = this.timesheetStateService.date;
    this.firstday1 = new Date(this.curr.getFullYear(), this.curr.getMonth(), this.curr.getDate() - this.curr.getDay() + 1);
    this.lastday1 = new Date(this.firstday1.getFullYear(), this.firstday1.getMonth(), this.firstday1.getDate() + 6);
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem("userId");
    this.timesheetConfig$ = this.timesheetConfigurationStateService.timesheetConfiguration$;
    this.timesheet$ = this.timesheetStateService.timesheet$;
    this.timeEntries$ = this.timesheetStateService.timeEntries$;
    this.timesheetApprovals$ = this.timesheetStateService.timesheetApprovals$;

    this.timesheetConfig$.subscribe(tsc => this.timesheetConfig = tsc ?? { WorkingDays: [], WorkingHour: 0 });
    this.timesheet$.subscribe(ts => this.timesheet = ts ?? null);
    this.timeEntries$.subscribe(te => this.timeEntries = te ?? null);
    this.timesheetApprovals$.subscribe(tsa => this.timesheetApprovals = tsa ?? null);

    if (this.userId) {
      this.getProjectsAndClients(this.userId);

      this.timesheetStateService.getTimesheet(this.userId);
    }

    this.checkForCurrentWeek();
    this.calculateWeeklyTotalHours();

    this.validateForm = this.fb.group({
      fromDate: [null, [Validators.required]],
      toDate: [null],
      client: [null, [Validators.required]],
      project: [null, [Validators.required]],
      hours: [null, [Validators.required]],
      note: [null, [Validators.required]],
    });

    this.weekDays = this.dayAndDateService.getWeekByDate(this.curr);
    this.firstday1 = this.dayAndDateService.getWeekendFirstDay();
    this.lastday1 = this.dayAndDateService.getWeekendLastDay();
    this.calcualteNoOfDaysBetweenDates();
  }

  // To calculate the time difference of two dates
  calcualteNoOfDaysBetweenDates() {
    let date1 = new Date("06/21/2019");
    let date2 = new Date("07/30/2019");
    let Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  }

  getTimesheetConfiguration() {
    this.timesheetService.getTimeSheetConfiguration().subscribe(response => {
      if (response) {
        this.timesheetConfig = response;
      }
    }, error => {
      this.createNotification("error", "Error getting timesheet configuration.");
    })
  }

  getTimesheet(userId: string, date?: Date) {
    this.weeklyTotalHours = 0;

    this.timesheet = null;
    this.timeEntries = null;
    this.timesheetApprovals = null;
    this.timesheetService.getTimeSheet(userId, date).subscribe(response => {
      this.timesheet = response ? response : null;

      if (this.timesheet) {
        this.getTimeSheetApproval(this.timesheet.Guid);
      }
      else {
        this.checkForCurrentWeek();
      }
    }, error => {
      console.log(error);
    });
  }

  checkTimeOverThreeWeeks(date: Date): void {
    const nowDate: Date = this.dayAndDateService.getWeeksFirstDate(new Date());
    const projectDate: Date = date;
    startingDateCriteria.startingDate = projectDate
    const threeWeeksinMillisecond = 3 * 7 * 24 * 3600 * 1000
    startingDateCriteria.isBeforeThreeWeeks =
      (nowDate.getTime() - projectDate.getTime() > threeWeeksinMillisecond) ?
        true : false;
  }

  getTimeSheetApproval(guid: string) {
    this.timesheetService.getTimeSheetApproval(guid).subscribe(response => {
      this.timesheetApprovals = response ? response : null;
      this.isSubmitted = response ? true : false;
      this.checkForCurrentWeek();
    });
  }

  getProjectsAndClients(userId: string) {
    this.timesheetService.getProjects(userId).subscribe(response => {
      this.projects = response;

      let clientIds = this.projects?.map(project => project.clientId);
      clientIds = clientIds?.filter((client: string, index: number) => clientIds?.indexOf(client) === index);

      this.timesheetService.getClients(clientIds).subscribe(response => {
        this.clients = response;
      });
    });
  }

  clientValueChange(value: string) {
    if (!this.userId) {
      return;
    }
    let clientId = value;
    this.timesheetService.getProjects(this.userId, clientId).subscribe(pp => {
      this.projects = pp;
      this.setDefaultProject(this.projects);
    });
  }

  projectValueChange(value: string) {
    let projectId = value;
    let project: Project | null = null;
    this.timesheetService.getProject(projectId).subscribe(response => {
      project = response ? response[0] : null;
      if (project) {
        this.timesheetService.getClient(project.clientId).subscribe(response => {
          this.clients = response
          this.setDefaultClient(this.clients);
        });
      }
    });
  }

  disabledDate1 = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.date) > 0;

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() < this.endValue1.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  selectedDate(count: any) {
    this.parentCount = count;
    if (count != null) {
      this.weekDays = this.dayAndDateService.getWeekByDate(count);
      this.firstday1 = this.dayAndDateService.getWeekendFirstDay();
      this.lastday1 = this.dayAndDateService.getWeekendLastDay();
      this.checkTimeOverThreeWeeks(this.firstday1);

      if (this.userId) {
        this.timesheetStateService.getTimesheet(this.userId, this.weekDays[0]);
      }
    }
  }

  selectedDateCanceled(curr: any) {
    if (curr != null) {
      this.weekDays = this.dayAndDateService.getWeekByDate(curr);
      this.firstday1 = this.dayAndDateService.getWeekendFirstDay();
      this.lastday1 = this.dayAndDateService.getWeekendLastDay();
    }
  }

  nextWeek(count: any) {
    this.nextWeeks = count;
    let ss = this.dayAndDateService.getWeekendLastDay();
    this.weekDays = this.dayAndDateService.nextWeekDates(ss, count);
    this.firstday1 = this.dayAndDateService.getWeekendFirstDay();
    this.lastday1 = this.dayAndDateService.getWeekendLastDay();
    this.checkTimeOverThreeWeeks(this.firstday1);

    if (this.userId) {
      this.timesheetStateService.getTimesheet(this.userId, this.weekDays[0]);
    }

    this.checkForCurrentWeek();
  }

  lastastWeek(count: any) {
    this.lastWeeks = count;
    let ss = this.dayAndDateService.getWeekendFirstDay();
    this.weekDays = this.dayAndDateService.lastWeekDates(ss, count);
    this.firstday1 = this.dayAndDateService.getWeekendFirstDay();
    this.lastday1 = this.dayAndDateService.getWeekendLastDay();
    this.checkTimeOverThreeWeeks(this.firstday1);

    if (this.userId) {
      this.timesheetStateService.getTimesheet(this.userId, this.weekDays[0]);
    }

    this.checkForCurrentWeek();
  }

  /* checkForCurrentWeek()
  * check if the displayed week is the current week
  * check if all working days have time entry
  * check if all working days have minimum hour
  */
  checkForCurrentWeek(): void {
    let date = new Date();
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (this.timesheetApprovals && this.timesheetApprovals.length > 0) {
      this.dateColumnContainerClass = "";
    }
    else if (this.lastday1.valueOf() >= date.valueOf()) {
      this.dateColumnContainerClass = "";
    }
    else {
      this.dateColumnContainerClass = "date-column-container";

      if (this.timeEntries && this.timeEntries.length > 0 && this.timesheetValidationService.isValidForApproval(this.timeEntries, this.timesheetConfig)) {
        this.createNotification("warning", "Timesheet hase not been submitted", "bottomRight");
      }
      else {
        this.createNotification("warning", "Timesheet has not been filled", "bottomRight");
      }
    }
  }

  calculateWeeklyTotalHours() {
    if (this.timeEntries) {
      this.weeklyTotalHours = this.timeEntries?.map(timeEntry => timeEntry.Hour).reduce((prev, next) => prev + next, 0);
    }
    else {
      this.weeklyTotalHours = 0;
    }
  }

  onDateColumnClicked(dateColumnEvent: DateColumnEvent, date: Date) {
    this.clickEventType = dateColumnEvent.clickEventType;
    this.timeEntry = null;
    this.date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    this.setDateColumnTotalHour();


    if (this.date > new Date()) {
      this.createNotification("error", "Can't fill timesheet for the future.", "bottomRight");
      return;
    }

    if (this.dateColumnTotalHour < 24) {
      this.scrollPageToTop();
      this.checkForApproalAndShowFormDrawer();
    } else {
      this.createNotification("error", "Day is already filled up to 24 hours", "bottomRight");
    }

  }

  scrollPageToTop() {
    window.scroll({
      top: 0,
      left: 0,
      // behavior: 'smooth'
    });
  }

  onProjectNamePaletClicked(timeEntryEvent: TimeEntryEvent, date: Date) {
    this.clickEventType = timeEntryEvent.clickEventType;
    this.timeEntry = timeEntryEvent.timeEntry;
    this.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.setDateColumnTotalHour();

    this.checkForApproalAndShowFormDrawer();
  }

  onPaletEllipsisClicked(timeEntryEvent: TimeEntryEvent, date: Date) {
    this.clickEventType = timeEntryEvent.clickEventType;
    this.timeEntry = timeEntryEvent.timeEntry;
    this.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.setDateColumnTotalHour();
  }

  onEditButtonClicked(clickEventType: ClickEventType, date: Date) {
    this.clickEventType = clickEventType;
    this.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.checkForApproalAndShowFormDrawer();
  }

  onDeleteButtonClicked(clickEvenetType: ClickEventType, date: Date) {
    this.clickEventType = clickEvenetType;

    if (this.userId) {
      this.timesheetStateService.getTimesheet(this.userId, date);
    }
  }

  checkForApproalAndShowFormDrawer() {
    if (!this.timesheet) {
      this.showFormDrawer();
      return;
    }

    this.timesheetService.getTimeSheetApproval(this.timesheet?.Guid).subscribe(objApprove => {
      this.timesheetApprovals = objApprove ? objApprove : null;
      if (!this.timesheetApprovals || this.timesheetApprovals.length === 0) {
        this.showFormDrawer();
        return;
      }

      if (!this.timeEntry) {
        this.notification.error('error', "You can't edit entries that are approved or submitted for approval.");
        this.clearFormData();
        return;
      }

      let timesheetApproval = this.timesheetApprovals.filter(tsa => tsa.ProjectId === this.timeEntry?.ProjectId);

      if (timesheetApproval.length > 0 && timesheetApproval[0].Status != ApprovalStatus.Rejected) {
        this.notification.error('error', "You can't edit entries that are approved or submitted for approval.");
        this.clearFormData();
      }
      else {
        this.showFormDrawer();
      }
    });
  }

  showFormDrawer() {
    if (this.clickEventType === ClickEventType.showFormDrawer) {
      this.setDefaultClient(this.clients);
      this.setDefaultProject(this.projects);

      if (this.timeEntry) {
        let clientId = this.projects?.filter(project => project.id == this.timeEntry?.ProjectId)[0].clientId.toString();
        this.formData.client = clientId ? clientId : "";
        this.formData.project = this.timeEntry.ProjectId.toString();
        this.formData.hours = this.timeEntry.Hour;
        this.formData.note = this.timeEntry.Note;

        this.disableFromDate = true;
        this.disableToDate = true;
        this.disableClient = true;
        this.disableProject = true;
      }

      this.formData.fromDate = this.date;
      this.formData.toDate = this.date;

      this.drawerVisible = true;
    }

    this.clickEventType = ClickEventType.none;
  }

  setDefaultClient(clients: Client[] | null) {
    if (!clients) {
      return;
    }
    else if (this.formData.client && this.formData.client != "") {
      return;
    }

    (clients.length === 1) ? this.formData.client = clients[0].id.toString() : this.formData.client = '';
  }

  setDefaultProject(projects: Project[] | null) {
    if (!projects) {
      return;
    }
    else if (this.formData.project && this.formData.project != "") {
      return;
    }

    (projects.length === 1) ? this.formData.project = projects[0].id.toString() : this.formData.project = '';
  }

  submitForm(): void {
    this.invalidEntries = [];

    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    try {
      let timeEntry: TimeEntry = {
        Guid: "00000000-0000-0000-0000-000000000000",
        Note: this.validateForm.value.note,
        Date: new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate()),
        Index: 1,
        Hour: this.validateForm.value.hours,
        ProjectId: this.validateForm.value.project,
        TimeSheetId: "00000000-0000-0000-0000-000000000000"
      }

      if (this.formData.fromDate === this.formData.toDate) {
        this.addTimeEnteryForOneDay(timeEntry);
      } else {
        this.addTimeEntryForDateRange(timeEntry);
      }

      if (!this.invalidEntries || this.invalidEntries.length == 0) {
        this.closeFormDrawer();
      }
    } catch (err) {
      console.error(err);
    }
  }

  addTimeEnteryForOneDay(timeEntry: TimeEntry) {
    if (this.timeEntry) {
      timeEntry.Guid = this.timeEntry.Guid;
      timeEntry.TimeSheetId = this.timeEntry.TimeSheetId;

      this.updateTimeEntry(timeEntry);
    }
    else if (this.timesheet) {
      timeEntry.TimeSheetId = this.timesheet.Guid;
      this.timesheetService.getTimeEntries(this.timesheet.Guid, this.date, timeEntry.ProjectId).subscribe(response => {
        this.timeEntry = response ? response[0] : null;

        if (this.timeEntry) {
          timeEntry.Guid = this.timeEntry.Guid;
          timeEntry.Hour = this.timeEntry.Hour + timeEntry.Hour;
          timeEntry.Note = this.timeEntry.Note + "\n" + timeEntry.Note;

          this.updateTimeEntry(timeEntry);

          this.timeEntry = null;
        }
        else {
          this.addTimeEntry(timeEntry);
        }
      })
    }
    else {
      this.addTimeEntry(timeEntry);
    }
  }

  addTimeEntryForDateRange(timeEntry: TimeEntry) {

    if (!this.formData.fromDate || !this.formData.toDate) {
      return;
    }

    let timeEntries: TimeEntry[] = [];
    let tmpTimeEntry: TimeEntry | null;
    let dates = this.dayAndDateService.getRangeOfDates(this.formData.fromDate, this.formData.toDate);

    const fromDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate() - this.date.getDay() + 1);
    const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate() + 6);

    this.timesheetValidationService.fromDate = fromDate;
    this.timesheetValidationService.toDate = toDate;

    if (this.timesheet) {
      for (let i = 0; i < dates.length; i++) {
        timeEntry.Date = new Date(dates[i]);
        timeEntry.TimeSheetId = this.timesheet.Guid;
        tmpTimeEntry = this.timeEntries?.filter(te => new Date(te.Date).valueOf() === timeEntry.Date.valueOf() && te.ProjectId === timeEntry.ProjectId)[0] ?? null;

        let timeEntryClone;

        if (tmpTimeEntry) {
          tmpTimeEntry = { ...tmpTimeEntry };

          tmpTimeEntry.Date = timeEntry.Date;
          tmpTimeEntry.Hour = tmpTimeEntry.Hour + timeEntry.Hour;
          tmpTimeEntry.Note = tmpTimeEntry.Note + "\n" + timeEntry.Note;

          timeEntryClone = { ...tmpTimeEntry };
        }
        else {
          timeEntryClone = { ...timeEntry };
        }

        if (this.timesheetValidationService.isValidForAdd(timeEntryClone, this.timeEntries ?? [], this.timesheetApprovals ?? [], this.timesheetConfig)) {
          timeEntries.push(timeEntryClone);
        }
        else {
          this.invalidEntries.push({
            Date: timeEntry.Date,
            Message: this.timesheetValidationService.message ?? ""
          });
        }
      }
    }
    else {
      for (let i = 0; i < dates.length; i++) {
        timeEntry.Date = new Date(dates[i]);

        let timeEntryClone = { ...timeEntry };

        if (this.timesheetValidationService.isValidForAdd(timeEntry, this.timeEntries ?? [], this.timesheetApprovals ?? [], this.timesheetConfig)) {
          timeEntries.push(timeEntryClone);
        }
        else {
          this.invalidEntries.push({
            Date: timeEntry.Date,
            Message: this.timesheetValidationService.message ?? ""
          });
        }
      }
    }

    if (this.invalidEntries && this.invalidEntries.length > 0) {
      this.modalVisible = true;
      return;
    }

    if (timeEntries && timeEntries.length > 0) {
      this.addTimeEntryForRangeOfDates(timeEntries);
    }
  }

  handleOk() {
    this.modalVisible = false;
  }

  addTimeEntry(timeEntry: TimeEntry) {
    if (!this.userId) {
      return;
    }

    let date = new Date(timeEntry.Date);
    timeEntry.Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 3, 0, 0, 0);

    this.timesheetService.addTimeEntry(this.userId, timeEntry).subscribe(response => {
      if (this.userId) {
        this.timesheetStateService.getTimesheet(this.userId, this.date);
      }
      this.createNotification("success", "Your Timesheet Added Successfully.");
    }, error => {
      this.createNotification("warning", "Warning");
    });
  }

  addTimeEntryForRangeOfDates(timeEntries: TimeEntry[]) {
    if (!this.userId) {
      return;
    }

    for (let timeEntry of timeEntries) {
      let date = timeEntry.Date;
      timeEntry.Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 3, 0, 0, 0);
    }

    this.timesheetService.addTimeEntryForRangeOfDates(this.userId, timeEntries).subscribe(response => {
      if (this.userId) {
        this.timesheetStateService.getTimesheet(this.userId, this.date);
      }
      this.createNotification("success", "Time entry for a range added successfully");
    }, error => {
      this.createNotification("error", "Error on adding time entry for a range");
    });
  }

  updateTimeEntry(timeEntry: TimeEntry) {
    let date = timeEntry.Date;
    timeEntry.Date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 3, 0, 0, 0);

    this.timesheetService.updateTimeEntry(timeEntry).subscribe(response => {
      if (this.userId) {
        this.timesheetStateService.getTimesheet(this.userId, this.date);
      }
      this.createNotification('success', "Your Timesheet Updated Successfully.");
    }, error => {
      this.createNotification('error', "Error on adding Timesheet.");
      console.log(error);
    });
  }

  closeFormDrawer(): void {
    this.clearFormData();
    this.drawerVisible = false;
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.clearFormData();
  }

  clearFormData() {
    this.timeEntry = null;
    this.disableFromDate = false;
    this.disableToDate = false;
    this.disableClient = false;
    this.disableProject = false;
    this.validateForm.reset();
    this.setDateColumnTotalHour();
    if (this.userId) {
      this.getProjectsAndClients(this.userId);
    }
  }

  setDateColumnTotalHour() {
    let fromDate = this.formData.fromDate;
    let toDate = this.formData.toDate;
    let totalHour = this.timeEntries?.filter(timeEntry => new Date(timeEntry.Date).getTime() === this.date.getTime()).map(timeEntry => timeEntry.Hour).reduce((prev, curr) => prev + curr, 0);

    if (this.timeEntry) {
      this.dateColumnTotalHour = totalHour ? totalHour : 0;
      this.dateColumnTotalHour -= this.timeEntry ? this.timeEntry.Hour : 0;
    }
    else if (fromDate && toDate) {
      fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
      toDate = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());

      if (fromDate.valueOf() === toDate.valueOf()) {
        this.dateColumnTotalHour = totalHour ? totalHour : 0;
      }
      else {
        this.dateColumnTotalHour = 0;
      }
    }
    else {
      this.dateColumnTotalHour = totalHour ?? 0;
    }
  }

  onFormFromDateChange() {
    if (this.disableFromDate) {
      return;
    }

    if (this.formData.fromDate) {
      this.formData.toDate = this.formData.fromDate;
      this.disableToDate = false;
      this.setColumnDate(this.formData.fromDate);
    }
    else {
      this.formData.toDate = null;
      this.disableToDate = true;
    }

    this.setDateColumnTotalHour();
  }

  onFormToDateChange() {
    if (!this.formData.toDate || !this.formData.fromDate) {
      return;
    }

    if (this.formData.toDate < this.formData.fromDate) {
      this.formData.fromDate = this.formData.toDate;

      this.setColumnDate(this.formData.fromDate);
    }

    this.setDateColumnTotalHour();
  }

  setColumnDate(date: Date) {
    this.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  createNotification(type: string, message: string, position?: NzNotificationPlacement) {

    if (!position) {
      position = "topRight";
    }

    switch (type.toLowerCase()) {
      case "success":
        this.notification.success("", message, { nzPlacement: position });
        break;
      case "info":
        this.notification.info("", message, { nzPlacement: position });
        break;
      case "warning":
        this.notification.warning("", message, { nzPlacement: position });
        break;
      case "error":
        this.notification.error("", message, { nzPlacement: position });
        break;
    }
  }

  disabledDates = (current: Date): boolean => {
    let date = new Date(current.getFullYear(), current.getMonth(), current.getDate());
    let fromDate = new Date(this.firstday1.getFullYear(), this.firstday1.getMonth(), this.firstday1.getDate());
    let toDate = new Date(this.lastday1.getFullYear(), this.lastday1.getMonth(), this.lastday1.getDate());

    return date.valueOf() < fromDate.valueOf() || date.valueOf() > toDate.valueOf() || date.valueOf() > new Date().valueOf();
  }
}
