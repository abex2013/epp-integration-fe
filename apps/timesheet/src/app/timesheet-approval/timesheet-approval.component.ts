import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginatedResult } from '../models/PaginatedResult';
import { TimesheetApproval } from '../models/timesheetModels';
import { TimesheetService } from '../timesheet/services/timesheet.service';

interface ItemData {
  id: number,
  name: string;
  dateRange: string;
  projectName: number;
  clientName: string;
  hours: number,
  stats: string
}


@Component({
  selector: 'exec-epp-timesheet-approval',
  templateUrl: './timesheet-approval.component.html',
  styleUrls: ['./timesheet-approval.component.scss']
})
export class TimesheetApprovalComponent implements OnInit {
  date = null;
  bulkCheck = true;
  statusColumn = true;
  cols: TemplateRef<any>[] = [];
  currentNameSubject$ = new BehaviorSubject(true);

  qtyofItemsSelected = 0

  searchProject = new FormControl();

  isVisible = false;
  isOkLoading = false;


  timeSheetApproval!: TimesheetApproval[];
  timeSheetApprovalAll!: TimesheetApproval[];
  totalAll = 10;
  pageIndexAll = 1;
  pageSizeAll = 10;
  totalPageAll!: number;

  timeSheetApprovalAwaiting!: TimesheetApproval[];
  totalAwaiting = 10;
  pageIndexAwaiting = 1;
  pageSizeAwaiting = 10;
  totalPageAwaiting!: number;

  timeSheetApprovalApproved!: TimesheetApproval[];
  totalApproved = 10;
  pageIndexApproved = 1;
  pageSizeApproved = 10;
  totalPageApproved!: number;

  timeSheetApprovalReview!: TimesheetApproval[];
  totalReview = 10;
  pageIndexReview = 1;
  pageSizeReview = 10;
  totalPageReview!: number;

  loading = true;

  idParam = '';
  totalPage!: number;

  //table

  total = 10;
  pageIndex = 1;
  pageSize = 10;

  sortByParam = "";
  sortDirection = "asc";

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();

  resources: any;

  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    }
  ];


  employees = [
    {
      id: 1,
      name: 'yosef',
      dateRange: Date.now(),
      projectName: 'HR Module',
      clientName: 'Connect+',
      hours: 8,
      status: 'Request for review'
    },
    {
      id: 3,
      name: 'Daniel James',
      dateRange: Date.now(),
      projectName: 'Finanace Module',
      clientName: 'Security Finance',
      hours: 12,
      status: 'Awaiting Approval'
    },
    {
      id: 9,
      name: 'Abel',
      dateRange: Date.now(),
      projectName: 'Test',
      clientName: 'test',
      hours: 20,
      status: 'Approved'
    },
    {
      id: 5,
      name: 'hana',
      dateRange: Date.now(),
      projectName: 'test',
      clientName: 'test',
      hours: 10,
      status: 'Approved'
    },
    {
      id: 11,
      name: 'yosef',
      dateRange: Date.now(),
      projectName: 'HR Module',
      clientName: 'Connect+',
      hours: 8,
      status: 'Request for review'
    },
    {
      id: 13,
      name: 'Daniel',
      dateRange: Date.now(),
      projectName: 'Finanace Module',
      clientName: 'Security Finance',
      hours: 12,
      status: 'Awaiting Approval'
    },
    {
      id: 19,
      name: 'Abel',
      dateRange: Date.now(),
      projectName: 'Test',
      clientName: 'test',
      hours: 20,
      status: 'Approved'
    },
    {
      id: 15,
      name: 'hana',
      dateRange: Date.now(),
      projectName: 'test',
      clientName: 'test',
      hours: 10,
      status: 'Approved'
    },
    {
      id: 16,
      name: 'Daniel',
      dateRange: Date.now(),
      projectName: 'Finanace Module',
      clientName: 'Security Finance',
      hours: 12,
      status: 'Awaiting Approval'
    },
    {
      id: 17,
      name: 'Abel',
      dateRange: Date.now(),
      projectName: 'Test',
      clientName: 'test',
      hours: 20,
      status: 'Approved'
    },
    {
      id: 18,
      name: 'hana',
      dateRange: Date.now(),
      projectName: 'test',
      clientName: 'test',
      hours: 10,
      status: 'Approved'
    }
  ];

  constructor(
    private router: Router,
    private timeSheetService: TimesheetService
  ) { }

  ngOnInit(): void {
    this.timesheetApprovalPaginationAll(1, 10);
    this.timesheetSubmissionPaginationAwaiting(1, 10);
    this.timesheetSubmissionPaginationApproved(1,10);
    this.timesheetSubmissionPaginationReview(1,10);
  }

  timesheetApprovalPaginationAll(index: number, pageSize: number) {
    this.timeSheetService
      .getTimesheetApprovalPagination(index, pageSize)
      .subscribe((response: PaginatedResult<TimesheetApproval[]>) => {
        this.timeSheetApprovalAll = response.data;
        this.pageIndexAll = response.pagination.pageIndex;
        this.pageSizeAll = response.pagination.pageSize;
        this.totalAll = response.pagination.totalRecord;
        this.totalPageAll = response.pagination.totalPage;
      });
  }

  timesheetSubmissionPaginationAwaiting(index: number, pageSize: number) {
    this.timeSheetService
      .getTimesheetApprovalPagination(index, pageSize)
      .subscribe((response: PaginatedResult<TimesheetApproval[]>) => {
        this.timeSheetApprovalAwaiting = response.data;
        this.pageIndexAwaiting = response.pagination.pageIndex;
        this.pageSizeAwaiting = response.pagination.pageSize;
        this.totalAwaiting = response.pagination.totalRecord;
        this.totalPageAwaiting = response.pagination.totalPage;
      });
  }

  timesheetSubmissionPaginationApproved(index: number, pageSize: number) {
    this.timeSheetService
      .getTimesheetApprovalPagination(index, pageSize)
      .subscribe((response: PaginatedResult<TimesheetApproval[]>) => {
        this.timeSheetApprovalApproved = response.data;
        this.pageIndexApproved = response.pagination.pageIndex;
        this.pageSizeApproved = response.pagination.pageSize;
        this.totalApproved = response.pagination.totalRecord;
        this.totalPageApproved = response.pagination.totalPage;
      });
  }

  timesheetSubmissionPaginationReview(index: number, pageSize: number) {
    this.timeSheetService
      .getTimesheetApprovalPagination(index, pageSize)
      .subscribe((response: PaginatedResult<TimesheetApproval[]>) => {
        this.timeSheetApprovalReview = response.data;
        this.pageIndexReview = response.pagination.pageIndex;
        this.pageSizeReview = response.pagination.pageSize;
        this.totalReview = response.pagination.totalRecord;
        this.totalPageReview = response.pagination.totalPage;
      });
  }


  getweek(result: Date): void {
    console.log('week: ');
  }


  onTabSelected(tab: any) {
    console.log(tab);
    if (tab === 1) {
      this.currentNameSubject$.next(true);
    }
    else {
      this.currentNameSubject$.next(false);
    }
  }


onItemCheckStatusChange(event: number){
  this.qtyofItemsSelected = event;
}
updateProjectResourseList(resources: any) {
  this.resources = resources;
  console.log(this.resources);
}
// for the table

  PageIndexChange(index: any): void {
    this.pageIndex = index;
    this.loading = true;
    this.timesheetApprovalPaginationAll(index, 10);
    this.loading = false;
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
      console.log(this.setOfCheckedId);
    } else {
      this.setOfCheckedId.delete(id);
      console.log(this.setOfCheckedId);
    }
  }

  

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }


onItemChecked(id: number, checked: boolean): void {
  this.qtyofItemsSelected += (checked? 1: -1);
  this.updateCheckedSet(id, checked);
  this.refreshCheckedStatus();
}

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }


  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }


  sorter(heading: string) {
    if (heading === 'Name') {
      this.sortByParam = "name";
    } else if (heading === 'Date Range') {
      this.sortByParam = "dateRange";
    } else if (heading === 'Project Name') {
      this.sortByParam = "projectName";
    } else if (heading === 'Client Name') {
      this.sortByParam = "clientName";
    } else {
      this.sortByParam = "";
    }

    if (this.sortDirection === 'desc') {
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'desc';
    }
  }


  showModal(id: any): void {
    this.isVisible = true;
    console.log(id);
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
