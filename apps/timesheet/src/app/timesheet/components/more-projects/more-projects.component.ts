import {Component, Input, OnInit} from '@angular/core';
import {TimeEntry} from "../../../models/timesheetModels";
import {ClickEventType} from "../../../models/clickEventType";
import {NzNotificationPlacement, NzNotificationService} from "ng-zorro-antd/notification";
import {TimesheetService} from "../../services/timesheet.service";
import {Project} from "../../../models/project";

@Component({
  selector: 'exec-epp-more-projects',
  templateUrl: './more-projects.component.html',
  styleUrls: ['./more-projects.component.scss']
})
export class MoreProjectsComponent implements OnInit {
  @Input() moreTimeEntry: TimeEntry | null = null;
  isVisible = false;
  project: Project | null = null;

  constructor(private notification: NzNotificationService, private timesheetService: TimesheetService) {

  }
  popoverVisible = false;
  ngOnInit(): void {
    if (this.moreTimeEntry) {
      this.timesheetService.getProject(this.moreTimeEntry.ProjectId).subscribe(response => {
        this.project = response ? response[0] : null;
      });
    }
  }

  onDateColumnClicked() {
    this.createNotificationErrorOnDailyMaximumHour("bottomRight");
  }
  showPopover() {
    // if (this.clickEventType === ClickEventType.none) {
    //   this.clickEventType = ClickEventType.showPaletPopover;
    //   this.paletEllipsisClicked.emit(this.clickEventType);
    //   this.popoverVisible = true;
    // }
  }
  showFormDrawer() {
    // if (this.clickEventType === ClickEventType.none) {
    //   this.editClicked.emit(ClickEventType.showFormDrawer);
    //   this.popoverVisible = false;
    // }
    //
    // this.clickEventType = ClickEventType.none;
  }
  createNotificationErrorOnDailyMaximumHour(position: NzNotificationPlacement): void {
    this.notification.error(
      '',
      'more project will be shown',
      {nzPlacement: position}
    );
  }


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
