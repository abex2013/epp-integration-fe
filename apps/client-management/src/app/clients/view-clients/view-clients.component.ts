import { Client, ClientStatus, Employee, PaginatedResult } from '../../core/models/get';
import { ClientService, ClientStatusService, EmployeeService } from '../../core/services';
import { Component, OnInit } from '@angular/core';

import { AllDataResponse } from '../../core/models/get/AllDataResponse';
import { FetchclientsService } from '../../core/services/fetchclients.service';
import { FormControl } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { OperatingAddress } from '../../core/models/get/operating-address';
import { OperationalAddressService } from '../../core/services/operational-address.service';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'exec-epp-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss'],
})

export class ViewClientsComponent implements OnInit  {
  isVisible = false;

  paginatedprojects$!: Observable<PaginatedResult<Client[]>>;

  clientsdata: Client[] = [];
  searchProject = new FormControl();
  total = 10;
  totalRecordBackup=0;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  idParam = '';
  totalPage!: number;
  searchKey = '';
  unfilteredData!: Client[];
  AllData!: PaginatedResult<Client[]>;
  searchStateFound = false;
  sortByParam="";
  sortDirection = "asc";

  clientCheckbox = true;
  locationCheckbox = true;
  statusCheckbox = true;
  salesCheckbox = true;
  clientContactCheckbox = false;
  companyContactCheckbox = false;
  isFilter= false;
  listOfSearchName: string[] = [];
  searchAddress!: string;
  listofNames = [''];
  nameofclient = '';
  namesofclientsfilterd = [{ text: '', value: '', checked: false }];
  filteredArray = [''];
  ListOfSalesPerson = [''];
  namesofSalesPerson = '';
  filteredPersonArray = [''];
  namesofSalesfilterd = [{ text: '', value: '', checked: false }];
  searchSalesPerson!: string;
  listsearchSalesPerson: string[] = [];
  searchAddressList: string[] = [];
  searchstatusList: string[] = [];
  searchsalesPersonList: string[] = [];
  listOfLocation: string[] = [];
  nameOfLocation = '';
  namesofLocationsfilterd = [{ text: '', value: '', checked: false }];
  clientStatuses!: ClientStatus[];
  selectedValue!: string;
  locations!: OperatingAddress[];
  employees!: Employee[];
  allClients!: Client[];
  totalData: Client[]= [];
  totalData1: Client[]= [];
  constructor(
    private router: Router,
    private _clientservice: ClientService,
    private clientStatusService: ClientStatusService,
    private operatingAddressService: OperationalAddressService,
    private fetchclientsService: FetchclientsService,
    private employeeService: EmployeeService,
    private notification: NzNotificationService
  ) {}
  ngOnInit(): void {
    this.getClientStatus();
    this.getLocations();
    this.getSalesPerson();
    this.fetchAllData();
    this.initializeData();

    this.searchProject.valueChanges.pipe(debounceTime(1500)).subscribe(() => {
      this.SearchData();
    });
  }
  showModal(): void {
    this.isVisible = true;
  }

  sorter(id:number) {
    if (id === 1){
      this.sortByParam = "ClientName";
    } else if (id === 2){
      this.sortByParam = "OperatingAddressCountry";
    }else if (id === 3) {
      this.sortByParam = "ClientStatusName";
    } else if (id === 4) {
      this.sortByParam = "SalesPersonName";
    }

    if (this.sortDirection === 'desc') {
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'desc';
    }
  }

  onDefaultClick() {
    this.clientCheckbox = true;
    this.locationCheckbox = true;
    this.statusCheckbox = true;
    this.salesCheckbox = true;
    this.clientContactCheckbox = false;
    this.companyContactCheckbox = false;
  }

  addClientPage() {
    this.router.navigateByUrl('clients/add-client');
  }

  PageSizeChange(pageSize: number) {
    console.log(pageSize);
    this.pageSize = pageSize;
    this._clientservice
      .getWithPagnationResut(this.pageIndex, pageSize, this.searchProject.value)
      .subscribe((response: PaginatedResult<Client[]>) => {
        this.clientsdata = response.data;
        this.pageIndex = response.pagination.pageIndex;
        this.pageSize = response.pagination.pageSize;
        this.loading = false;

      });
  }


  getAllClientData(index: any) {
    console.log(index);

      this._clientservice
        .getWithPagnationResut(index, 10, this.searchProject.value)
        .subscribe((response: PaginatedResult<Client[]>) => {
          this.totalData1= response.data
          this.totalData.push(...this.totalData1);

        });

    }
  PageIndexChange(index: any): void {

   if(this.isFilter){
    this.clientsdata =this.totalData.slice((index-1)*10,index*10);

   }
   else{
    this.pageIndex = index;
    this.loading = true;
    if (this.searchProject.value?.length > 1 && this.searchStateFound == true) {
      this._clientservice
        .getWithPagnationResut(index, 10, this.searchProject.value)
        .subscribe((response: PaginatedResult<Client[]>) => {
          this.clientsdata = response.data;
          this.unfilteredData = response.data;
          this.pageIndex = response.pagination.pageIndex;
          this.total = response.pagination.totalRecord;

          this.totalPage = response.pagination.totalPage;
          this.pageSize = response.pagination.pageSize;
          this.loading = false;
        });


    } else {
      this._clientservice
        .getWithPagnationResut(index, 10)
        .subscribe((response: PaginatedResult<Client[]>) => {
          this.clientsdata = response.data;
          this.unfilteredData = response.data;
          this.pageIndex = response.pagination.pageIndex;
          this.pageSize = response.pagination.pageSize;
          this.loading = false;
          if((this.searchAddressList.length > 0) || (this.searchstatusList.length> 0) || (this.searchsalesPersonList.length> 0)){
            this.search(
              this.searchAddressList,
              this.searchstatusList,
              this.searchsalesPersonList
            );

          }


        });
      this.searchStateFound = false;
    }}
  }

  initializeData(): void {
    this._clientservice
      .getWithPagnationResut(1, 10)
      .subscribe((response: PaginatedResult<Client[]>) => {
        this.AllData = response;
        this.clientsdata = response.data;
        this.unfilteredData = response.data;
        this.pageIndex = response.pagination.pageIndex;
        this.pageSize = response.pagination.pageSize;
        this.total = response.pagination.totalRecord;
        this.totalPage = response.pagination.totalPage;
        this.loading = false;
        this._clientservice.setFristPageOfClients(response);
        this.findlistofNames();
        this.findlistSalesPersonNames();
        this.findlistOfLocation();
        console.log(response.data);
      });

    this._clientservice.fristPagantionClients$.subscribe(
      (response: PaginatedResult<Client[]>) => {
        this.AllData = response;
        this.clientsdata = response.data;
        this.unfilteredData = response.data;
        this.pageIndex = response.pagination.pageIndex;
        this.pageSize = response.pagination.pageSize;
        this.total = response.pagination.totalRecord;
        this.totalPage = response.pagination.totalPage;
        this.loading = false;
      }
    );
  }
  SearchData(): void {
    if (this.searchProject.value?.length > 1) {
      this.loading = true;
      this._clientservice
        .getWithPagnationResut(1, 10, this.searchProject.value)
        .subscribe((response: PaginatedResult<Client[]>) => {
          if (response?.data.length > 0) {
            this.loading = false;
            this.AllData = response;
            this.clientsdata = response.data;
            this.unfilteredData = response.data;
            this.pageIndex = response.pagination.pageIndex;
            this.pageSize = response.pagination.pageSize;
            this.total = response.pagination.totalRecord;
            this.totalPage = response.pagination.totalPage;
            this.searchStateFound = true;
          } else {
            this.loading = false;
            this.clientsdata = [] as Client[];
            this.unfilteredData = [] as Client[];
            this.pageIndex = 0;
            this.pageSize = 0;
            this.total = 0;
            this.totalPage = 0;
            this.searchStateFound = false;
            this.notification.blank('  Project not found', '', {
              nzPlacement: 'bottomLeft',
            });
          }
        });
    } else {
      this.clientsdata = this._clientservice.getFirsttPageValue().data;
      this.unfilteredData = this._clientservice.getFirsttPageValue().data;
      this.pageIndex =
        this._clientservice.getFirsttPageValue().pagination.pageIndex;
      this.pageSize =
        this._clientservice.getFirsttPageValue().pagination.pageSize;
      this.total =
        this._clientservice.getFirsttPageValue().pagination.totalRecord;
      this.totalPage =
        this._clientservice.getFirsttPageValue().pagination.totalPage;
    }
  }

  findlistofNames(): void {
    this.listofNames = [''];
    for (let i = 0; i < this.clientStatuses.length; i++) {
      this.nameofclient = this.clientStatuses[i].StatusName;
      this.listofNames.push(this.nameofclient);
      this.filteredArray = this.listofNames.filter((item, pos) => {
        return this.listofNames.indexOf(item) == pos;
      });
      this.listofNames = this.filteredArray.filter((item) => item);
    }

    for (let i = 0; i < this.listofNames.length; i++) {
      this.namesofclientsfilterd.push({
        text: this.listofNames[i],
        value: this.listofNames[i],
        checked: true,
      });
    }
    console.log(this.namesofclientsfilterd);

    this.namesofclientsfilterd = this.namesofclientsfilterd.filter(
      (word) => word
    );
    this.namesofclientsfilterd.shift();

    console.log(this.namesofclientsfilterd);
  }

  findlistSalesPersonNames(): void {
    this.ListOfSalesPerson = [''];
    for (let i = 0; i < this.employees.length; i++) {
      this.namesofSalesPerson = this.employees[i].Name;
      this.ListOfSalesPerson.push(this.namesofSalesPerson);
      this.filteredPersonArray = this.ListOfSalesPerson.filter((item, pos) => {
        return this.ListOfSalesPerson.indexOf(item) == pos;
      });

      this.ListOfSalesPerson = this.filteredPersonArray.filter((item) => item);
    }

    for (let i = 0; i < this.ListOfSalesPerson.length; i++) {
      this.namesofSalesfilterd.push({
        text: this.ListOfSalesPerson[i],
        value: this.ListOfSalesPerson[i],
        checked: true,
      });
    }

    this.namesofSalesfilterd = this.namesofSalesfilterd.filter((word) => word);
    this.namesofSalesfilterd.shift();

    console.log(this.namesofSalesfilterd);
  }

  findlistOfLocation(): void {
    this.listOfLocation = [''];
    for (let i = 0; i < this.locations.length; i++) {
      this.nameOfLocation = this.locations[i].Country;
      this.listOfLocation.push(this.nameOfLocation);
      this.filteredPersonArray = this.listOfLocation.filter((item, pos) => {
        return this.listOfLocation.indexOf(item) == pos;
      });

      this.listOfLocation = this.filteredPersonArray.filter((item) => item);
    }

    for (let i = 0; i < this.listOfLocation.length; i++) {
      this.namesofLocationsfilterd.push({
        text: this.listOfLocation[i],
        value: this.listOfLocation[i],
        checked: true,
      });
    }

    this.namesofLocationsfilterd = this.namesofLocationsfilterd.filter(
      (word) => word
    );
    this.namesofLocationsfilterd.shift();

    console.log(this.namesofLocationsfilterd);
  }

getClientStatus() {

  this.clientStatusService.getAll().subscribe((res: ClientStatus[]) => {
    this.clientStatuses = res;
      });
}

getLocations(){
  this.operatingAddressService.getData().subscribe((res:AllDataResponse<OperatingAddress[]>) => {
    this.locations = res.data;

      });
}
fetchAllData(){
  this.fetchclientsService.getData().subscribe((res:AllDataResponse<Client[]>) => {
    this.allClients = res.data;

      });

}
getSalesPerson(){
  this.employeeService.getAll().subscribe((response: Employee[]) => {
    this.employees = response;
  })
}
  search(
    searchAddressList: string[],
    searchstatusList: string[],
    searchsalesPersonList: string[]
  ): void {
    this.searchstatusList = searchstatusList;

    this.searchAddressList = searchAddressList;

    this.searchsalesPersonList = searchsalesPersonList;
    if((this.searchAddressList.length > 0) || (this.searchstatusList.length> 0) || (this.searchsalesPersonList.length> 0)){
      this.isFilter =true;
      this.totalData =[];
      this.loading = true;
      for(let i = 1; i <=this.totalPage;i++){
      this.getAllClientData(i);
      }

      setTimeout(() => {
        this.clientsdata = this.totalData;
        this.loading = false;

        const filterFunc = (item: Client) =>
          (this.searchAddressList.length
            ? this.searchAddressList.some(
                (address) =>
                  item.OperatingAddress[0].Country.indexOf(address) !== -1
              )
            : true) &&
          (this.searchstatusList.length
            ? this.searchstatusList.some(
                (name) => item.ClientStatusName.indexOf(name) !== -1
              )
            : true) &&
          (this.searchsalesPersonList.length
            ? this.searchsalesPersonList.some(
                (name) => item.SalesPerson.Name.indexOf(name) !== -1
              )
            : true);
        const data = this.clientsdata.filter((item) => filterFunc(item));
        this.clientsdata = data.slice(0,10);
        this.totalRecordBackup=this.total
              this.totalData=data;
              this.total=data.length;


      },4000)
    }
    else{
      this.isFilter = false;
      this.clientsdata = this.unfilteredData;
      this.total=this.totalRecordBackup;
    }

    // console.log(data);
  }
}
