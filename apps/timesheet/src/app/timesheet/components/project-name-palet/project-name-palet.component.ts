
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TimeEntryEvent } from '../../../models/clickEventEmitObjectType';
import { ClickEventType } from '../../../models/clickEventType';
import { Project } from '../../../models/project';
import { ApprovalStatus, TimeEntry, TimesheetApproval } from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';
import { NzModalService } from "ng-zorro-antd/modal";
import { DayAndDateService } from '../../services/day-and-date.service';
import { startingDateCriteria } from '../timesheet-detail/timesheet-detail.component';
import { TimesheetStateService } from '../../state/timesheet-state.service';

@Component({
  selector: 'app-project-name-palet',
  templateUrl: './project-name-palet.component.html',
  styleUrls: ['./project-name-palet.component.scss']
})
export class ProjectNamePaletComponent implements OnInit, OnChanges {
  @Output() projectNamePaletClicked = new EventEmitter<TimeEntryEvent>();
  @Output() paletEllipsisClicked = new EventEmitter<TimeEntryEvent>();
  @Output() editClicked = new EventEmitter<ClickEventType>();
  @Output() deleteClicked = new EventEmitter<ClickEventType>();
  @Input() timeEntry: TimeEntry | null = null;
  @Input() timesheetApproval: TimesheetApproval | null = null;
  project: Project | null = null;
  projectNamePaletClass = "project-name-palet"

  isVisible1 = false;
  clickEventType = ClickEventType.none;
  popoverVisible = false;
  startingDateCriteria = startingDateCriteria

  constructor(private timesheetService: TimesheetService,
    private readonly _dayAndDateService: DayAndDateService,
    private modal: NzModalService,
    private timesheetStateService: TimesheetStateService
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.timeEntry) {
      this.timesheetService.getProject(this.timeEntry.ProjectId).subscribe(response => {
        this.project = response ? response[0] : null;
      });
    }

    if (this.timesheetApproval && this.timesheetApproval.Status != ApprovalStatus.Rejected) {
      this.projectNamePaletClass = "project-name-palet-approved";
    } else {
      this.projectNamePaletClass = "project-name-palet";
    }
  }

  showPopover() {
    if (this.clickEventType !== ClickEventType.none) {
      return;
    }

    this.clickEventType = ClickEventType.showPaletPopover;
    let timeEntryEvent: TimeEntryEvent = { clickEventType: ClickEventType.showPaletPopover, timeEntry: this.timeEntry };

    if (this.startingDateCriteria.isBeforeThreeWeeks) {
      return;
    }

    this.paletEllipsisClicked.emit(timeEntryEvent);
    this.popoverVisible = this.timesheetApproval ? this.timesheetApproval.Status === ApprovalStatus.Rejected : true;
  }

  onProjectNamePaletClicked() {
    if (this.clickEventType !== ClickEventType.none) {
      this.clickEventType = ClickEventType.none;
      return;
    }

    this.clickEventType = ClickEventType.showFormDrawer;
    let timeEntryEvent: TimeEntryEvent = { clickEventType: ClickEventType.showFormDrawer, timeEntry: this.timeEntry };

    if (this.startingDateCriteria.isBeforeThreeWeeks) {
      this.clickEventType = ClickEventType.none;
      return;
    }
    /*
    if (!this.checkTimeOverThreeWeeks()) {
      this.clickEventType = ClickEventType.none;
      return;
    }
    //*/

    this.projectNamePaletClicked.emit(timeEntryEvent);
    this.clickEventType = ClickEventType.none; //Use this line of code when the element is the container element.
  }

  showFormDrawer() {
    if (this.clickEventType !== ClickEventType.none) {
      this.clickEventType = ClickEventType.none;
      return;
    }

    this.editClicked.emit(ClickEventType.showFormDrawer);
    this.popoverVisible = false;

    this.clickEventType = ClickEventType.none;
  }

  checkTimeOverThreeWeeks() {
    const nowDate: Date = this._dayAndDateService.getWeeksFirstDate(new Date());
    let projectDate: Date = this._dayAndDateService.getWeeksFirstDate(new Date());
    if (this.timeEntry) {
      projectDate = this._dayAndDateService.getWeeksFirstDate(new Date(this.timeEntry.Date));
    }
    const threeWeeksinMillisecond = 3 * 7 * 24 * 3600 * 1000
    if (nowDate.getTime() - projectDate.getTime() > threeWeeksinMillisecond) {
      return true;
    }
    return false;
  }

  closePopover() {
    this.popoverVisible = false;
  }

  showDeleteModal() {
    this.closePopover();
    this.isVisible1 = true;
  }

  handleOk() {
    this.deleteTimeEntry()
    this.isVisible1 = false;
  }

  handleCancel() {
    this.isVisible1 = false;
  }

  deleteTimeEntry(): void {
    if (this.timeEntry) {
      this.timesheetService.deleteTimeEntry(this.timeEntry?.Guid).subscribe(response => {
        this.deleteClicked.emit(ClickEventType.deleteTimeEntry);
      });
    }
  }

}
