import { Component, Input, OnInit, Output, EventEmitter, OnChanges, Directive, ElementRef, QueryList, ViewChildren, TemplateRef, ViewChild } from '@angular/core';
import { findIndex } from 'rxjs/operators';
import { DateColumnEvent, TimeEntryEvent } from '../../../models/clickEventEmitObjectType';
import { ClickEventType } from '../../../models/clickEventType';
import { TimeEntry, Timesheet, TimesheetApproval } from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';
import { ProjectNamePaletComponent } from '../project-name-palet/project-name-palet.component';

@Directive({
  selector: '[entries]',
})
export class DayAndDateDirective {
  constructor(public elRef: ElementRef) {

  }
}
@Component({
  selector: 'app-day-and-date-column',
  templateUrl: './day-and-date-column.component.html',
  styleUrls: ['./day-and-date-column.component.scss']
})
export class DayAndDateColumnComponent implements OnInit, OnChanges{

  @Output() dateColumnClicked = new EventEmitter<DateColumnEvent>();
  @Output() projectNamePaletClicked = new EventEmitter<TimeEntryEvent>();
  @Output() paletEllipsisClicked = new EventEmitter<TimeEntryEvent>();
  @Output() editButtonClicked = new EventEmitter<ClickEventType>();
  @Output() deleteButtonClicked = new EventEmitter<ClickEventType>();
  @Output() totalHoursCalculated = new EventEmitter<number>();
  @Output() columnOverflow = new EventEmitter<boolean>();
  @Input() item: any; // decorate the property with @Input()
  @Input() dates1: any; // decorate the property with @Input()
  @Input() date: Date = new Date();
  @Input() timesheet: Timesheet | null = null;
  @Input() timeEntries: TimeEntry[] | null = null;
  @Input() timesheetApprovals: TimesheetApproval[] | null = null;
  @Output() moreTimeEntries: EventEmitter<number> = new EventEmitter();
  @ViewChildren('entries') entriesDiv!: QueryList<any>;
  @ViewChild('pt') pointerEl!: ElementRef;
  @ViewChild('col') colEl!: ElementRef;
  @ViewChild('addIcon') iconEL!: ElementRef;
  totalHours: number = 0;
  dateColumnHighlightClass: string = "date-column-with-highlight";
  morePopover = false;
  index: number = 0;
  overflow = false;
  moreEntries: any[] = [];
  overflowPt?: number = 0;
  of: any;
  isSubmitted: boolean | undefined;
  constructor(private timesheetService: TimesheetService, public elRef: ElementRef) { }

  clickEventType = ClickEventType.none;

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate());
    this.timeEntries = this.timeEntries?.filter(te => new Date(te.Date).valueOf() === this.date.valueOf()) ?? null;

    if (this.timeEntries) {
      let totalHours = this.timeEntries?.map(timeEntry => timeEntry.Hour).reduce((prev, next) => prev + next, 0);
      this.totalHours = totalHours ? totalHours : 0;
      
    }

    let today = new Date();

    if (this.date > new Date(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDate() + 1))) {
      this.dateColumnHighlightClass = "date-column-with-no-highlight";
    }
    else if (this.timesheetApprovals && this.timesheetApprovals.length > 0) {
      this.dateColumnHighlightClass = "date-column-with-no-highlight";
    }
    else {
      this.dateColumnHighlightClass = "date-column-with-highlight";
    }
  }


  
  onProjectNamePaletClicked(timeEntryEvent: TimeEntryEvent) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = timeEntryEvent.clickEventType
      this.projectNamePaletClicked.emit(timeEntryEvent);
    }

    if (this.morePopover) {
      this.clickEventType = ClickEventType.none;
    }
  }

  onPaletEllipsisClicked(timeEntryEvent: TimeEntryEvent) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = timeEntryEvent.clickEventType;
      this.paletEllipsisClicked.emit(timeEntryEvent);
    }

    if (this.morePopover) {
      this.clickEventType = ClickEventType.none;
    }
  }

  onEditButtonClicked(clickEventType: ClickEventType) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = clickEventType;
      this.editButtonClicked.emit(this.clickEventType);
    }

    this.clickEventType = ClickEventType.none;
  }

  onDeleteButtonClicked(clickEventType: ClickEventType) {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = clickEventType;
      this.deleteButtonClicked.emit(this.clickEventType);
    }

    this.clickEventType = ClickEventType.none;
  }

  showFormDrawer() {
    if (this.clickEventType === ClickEventType.none) {
      this.clickEventType = ClickEventType.showFormDrawer;
      let dateColumnEvent: DateColumnEvent = {
        clickEventType: this.clickEventType,
        totalHours: this.totalHours
      }
      this.dateColumnClicked.emit(dateColumnEvent);
    }

    this.clickEventType = ClickEventType.none;
  }

  onClick() {
    this.clickEventType = ClickEventType.showPaletPopover;
    this.morePopover = true;
  }

  scrollTimeEntriesUp(el:any){
    const myElement = document.getElementById(el);
    myElement?.scrollIntoView();
    console.log('++++++++++++++++++++++++');
    console.log("item");
  }
 
  checkOverflow(divId:any){
    const elem = document.getElementById(divId)

    const isOverflowing = elem!.clientHeight < elem!.scrollHeight;

    if(isOverflowing){
      console.log('**********   ************* ************* ******** **************');
      elem!.classList.remove("entries-overflow");
      elem!.classList.add("show-scroll-bar");
    }


    console.log('-----------------');
    console.log(elem!.clientHeight);
    console.log(elem!.scrollHeight);
    console.log(elem);
  }


  timesheetApprovalForaProject(projectId: string) {
    if (!this.timesheetApprovals) {
      return null;
    }

    let timesheetApprovals = this.timesheetApprovals.filter(tsa => tsa.ProjectId === projectId)

    if (timesheetApprovals.length === 0) {
      return null;
    }
    else {
      return timesheetApprovals[0];
    }
  }
}
