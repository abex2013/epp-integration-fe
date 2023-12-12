import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResult } from '../../../models/PaginatedResult';
import {
  ApprovalStatus,
  TimesheetApproval,
} from '../../../models/timesheetModels';
import { TimesheetService } from '../../services/timesheet.service';
import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableQueryParams,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<TimesheetApproval> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<TimesheetApproval> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}
@Component({
  selector: 'exec-epp-view-submissions',
  templateUrl: './view-submissions.component.html',
  styleUrls: ['./view-submissions.component.scss'],
})
export class ViewSubmissionsComponent implements OnInit {
  date = null;
  listOfColumns: ColumnItem[] = [
    {
      name: 'Date Range',
      sortOrder: null,
      sortFn: (a: TimesheetApproval, b: TimesheetApproval) =>
        a.ToDate.toDateString().localeCompare(b.ToDate.toDateString()),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [] as { text: string; value: string }[],
      filterFn: null,
    },
    {
      name: 'Project Name',
      sortOrder: null,
      sortFn: (a: TimesheetApproval, b: TimesheetApproval) =>
        a.ProjectName.localeCompare(b.ProjectName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [] as { text: string; value: string }[],
      filterFn: (list: string[], item: TimesheetApproval) =>
        list.some((name) => item.ProjectName.indexOf(name) !== -1),
    },
    {
      name: 'Client Name',
      sortOrder: null,
      sortFn: (a: TimesheetApproval, b: TimesheetApproval) =>
        a.ClientName.localeCompare(b.ClientName),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [] as { text: string; value: string }[],
      filterFn: (list: string[], item: TimesheetApproval) =>
        list.some((name) => item.ClientName.indexOf(name) !== -1),
    },
    {
      name: 'Status',
      sortOrder: null,
      sortFn: (a: TimesheetApproval, b: TimesheetApproval) =>
        a.Status.toLocaleString().localeCompare(b.Status.toLocaleString()),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [] as { text: string; value: string }[],
      filterFn: (list: string[], item: TimesheetApproval) =>
        list.some((name) => item.Status.toLocaleString().indexOf(name) !== -1),
    },
    {
      name: "Manager's Notes",
      sortOrder: null,
      sortFn: null,
      sortDirections: [null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: null,
    },
  ];

  timeSheetHistory!: TimesheetApproval[];
  total = 10;
  loading = true;
  pageSize = 9;
  pageIndex = 1;
  idParam = '';
  totalPage!: number;
  clientNameFliter!: { text: string; value: string }[];
  projectNameFliter!: { text: string; value: string }[];
  statusFilter!: { text: string; value: string }[];
  params!: NzTableQueryParams;
  constructor(
    private router: Router,
    private timeSheetService: TimesheetService
  ) {}

  ngOnInit(): void {
    this.timesheetSubmissionPaginatin(1,this.pageSize,null,[]);
    this.timeSheetHistory = this.sampleData;
    this.total = this.sampleData.length;
    this.setFliters();
  }

  navaigateToTimeSheet() {
    this.router.navigateByUrl('timesheet');
  }

  timesheetSubmissionPaginatin(pageIndex:number, sortField:any, sortOrder:any, filter:any) {
    this.loading=true;
    this.timeSheetService
      .getTimesheetSubmissions(pageIndex, this.pageSize,sortField,sortOrder,filter)
      .subscribe((response: PaginatedResult<TimesheetApproval[]>) => {
        this.timeSheetHistory = response.data;
        this.pageIndex = response.pagination.pageIndex;
        this.pageSize = response.pagination.pageSize;
        this.total = response.pagination.totalRecord;
        this.totalPage = response.pagination.totalPage;
        this.loading=false;
      });
  }

  getWeek($event:Date)
  {
    console.log($event)
    const { pageSize, pageIndex, sort, filter } =this.params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    filter.push({key:"FromDate",value:$event})
    this.timesheetSubmissionPaginatin(pageIndex, sortField, sortOrder, filter);
 }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    this.loading=true;
    this.params=params
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.timesheetSubmissionPaginatin(pageIndex, sortField, sortOrder, filter);
  }
   
  PageIndexChange(index: number): void {
    this.pageIndex = index;
    const { pageSize, pageIndex, sort, filter } = this.params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.timesheetSubmissionPaginatin(index, sortField, sortOrder, filter);
    this.loading = false;
  }


  setFliters() {
    const clientNameList: string[] = [];
    const projectNameList: string[] = [];
    const statusList: number[] = [];
    this.projectNameFliter == [];
    this.clientNameFliter = [] as { text: string; value: string }[];
    for (let i = 0; i < this.timeSheetHistory.length; i++) {
      clientNameList.push(this.timeSheetHistory[i].ClientName);
      projectNameList.push(this.timeSheetHistory[i].ProjectName);
      statusList.push(this.timeSheetHistory[i].Status);
    }
    this.projectNameFliter = this.getUniqeValue(projectNameList).map((x) => {
      return { text: x, value: x };
    });
    this.clientNameFliter = this.getUniqeValue(clientNameList).map((x) => {
      return { text: x, value: x };
    });
    this.statusFilter = this.getUniqeValue(statusList).map((x) => {
      if (x == 0) return { text: 'Requested', value: x };
      else if (x == 1) return { text: 'Approved', value: x };
      else return { text: 'Rejected', value: x };
    });

    this.listOfColumns[1].listOfFilter = this.projectNameFliter;
    this.listOfColumns[2].listOfFilter = this.clientNameFliter;
    this.listOfColumns[3].listOfFilter = this.statusFilter;
    console.log(this.statusFilter);
  }

 
  getUniqeValue(value: any[]) {
    return value
      .map((item) => item)
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  get sampleData(): TimesheetApproval[] {
    return [
 
      {
        ProjectName: 'Fizer',
        ClientName: 'Security finance Coperation',
        Status: ApprovalStatus.Rejected,
        TimesheetId: '23456-23545-253252-2dfg34t',
        ProjectId: '23456-23545-253252-2dfg34t',
        Comment: 'fix the date date order',
        EmployeeName: 'Danail',
        FromDate: new Date(2021, 2, 29),
        ToDate: new Date(2021, 2, 3),
        CreatedDate: new Date(),
        TotalHours: 1231,
      },
      {
        ProjectName: 'ABC',
        ClientName: 'AB Bank',
        Status: ApprovalStatus.Requested,
        TimesheetId: '23456-23545-253252-2dfg34t',
        ProjectId: '23456-23545-253252-2dfg34t',
        Comment: '',
        EmployeeName: 'Danail',
        FromDate: new Date(2021, 2, 4),
        ToDate: new Date(2021, 2, 10),
        CreatedDate: new Date(),
        TotalHours: 1231,
      },
      {
        ProjectName: 'Rio',
        ClientName: 'Coca Cola',
        Status: ApprovalStatus.Rejected,
        TimesheetId: '23456-23545-253252-2dfg34t',
        ProjectId: '23456-23545-253252-2dfg34t',
        Comment: '',
        EmployeeName: 'Danail',
        FromDate: new Date(2021, 2, 19),
        ToDate: new Date(2021, 2, 24),
        CreatedDate: new Date(),
        TotalHours: 1231,
      },
      {
        ProjectName: 'Email App',
        ClientName: 'Coca Cola',
        Status: ApprovalStatus.Rejected,
        TimesheetId: '23456-23545-253252-2dfg34t',
        ProjectId: '23456-23545-253252-2dfg34t',
        Comment: '',
        EmployeeName: 'Danail',
        FromDate: new Date(2021, 2, 24),
        ToDate: new Date(2021, 2, 30),
        CreatedDate: new Date(),
        TotalHours: 1231,
      },
  
      {
        ProjectName: 'EPP',
        ClientName: 'Excellerent',
        Status: ApprovalStatus.Approved,
        TimesheetId: '23456-23545-253252-2dfg34t',
        ProjectId: '23456-23545-253252-2dfg34t',
        Comment: '',
        EmployeeName: 'Danail',
        FromDate: new Date(2021, 3, 11),
        ToDate: new Date(2021, 3, 18),
        CreatedDate: new Date(),
        TotalHours: 1231,
      },
      {
        ProjectName: 'Connect Plus',
        ClientName: 'Security Fiance ',
        Status: ApprovalStatus.Approved,
        TimesheetId: '23456-23545-253252-2dfg34t',
        ProjectId: '23456-23545-253252-2dfg34t',
        Comment: '',
        EmployeeName: 'Danail',
        FromDate: new Date(2021, 3, 21),
        ToDate: new Date(2021, 3, 28),
        CreatedDate: new Date(),
        TotalHours: 1231,
      },
      {
        ProjectName: 'Connect Plus',
        ClientName: 'Security Fiance ',
        Status: ApprovalStatus.Rejected,
        TimesheetId: '23456-23545-253252-2dfg34t',
        ProjectId: '23456-23545-253252-2dfg34t',
        Comment: 'fix the date date order',
        EmployeeName: 'Danail',
        FromDate: new Date(2021, 4, 1),
        ToDate: new Date(2021, 4, 8),
        CreatedDate: new Date(),
        TotalHours: 1231,
      },
      {
        ProjectName: 'Presence',
        ClientName: 'AOB LLC ',
        Status: ApprovalStatus.Requested,
        TimesheetId: '23456-23545-253252-2dfg34t',
        ProjectId: '23456-23545-253252-2dfg34t',
        Comment: 'fix the date date order',
        EmployeeName: 'Danail',
        FromDate: new Date(2021, 4, 9),
        ToDate: new Date(2021, 4, 15),
        CreatedDate: new Date(),
        TotalHours: 1231,
      },

      {
        ProjectName: 'Presence',
        ClientName: 'AOB LLC ',
        Status: ApprovalStatus.Approved,
        TimesheetId: '23456-23545-253252-2dfg34t',
        ProjectId: '23456-23545-253252-2dfg34t',
        Comment: 'fix the date date order',
        EmployeeName: 'Danail',
        FromDate: new Date(2021, 4, 17),
        ToDate: new Date(2021, 4, 25),
        CreatedDate: new Date(),
        TotalHours: 1231,
      }
    ];
  }
}
