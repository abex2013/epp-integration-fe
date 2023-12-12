import { Component,  OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {PaginatedResult, Project, ProjectService } from '../../../../core';


@Component({
  selector: 'exec-epp-view-project-layout',
  templateUrl: './view-project-layout.component.html',
  styleUrls: ['./view-project-layout.component.scss']
})
export class ViewProjectLayoutComponent implements OnInit {


paginatedprojects$!:Observable< PaginatedResult<Project[]>>;
  projects:Project[]=[]
  searchProject=new FormControl();
  total = 10;
  loading = true;
  pageSize = 10;
  pageIndex = 1;
  idParam='';
  totalPage!:number;
  searchKey='';
  Projects!:Project[];
  searchStateFound=false;
  checker= false;

  checkOptionsThree = [
    { label: 'Apple', value: 'Apple', disabled: true, checked: true },
    { label: 'Pear', value: 'Pear', disabled: true },
    { label: 'Orange', value: 'Orange' }
  ];

  PageSizeChange(pageSize){
    console.log(pageSize)
    this.pageSize=pageSize
    this.projectService.getWithPagnationResut(this.pageIndex, pageSize,this.searchProject.value)
   .subscribe((response:PaginatedResult<Project[]>)=>{
    this.projects=response.data;
    this.pageIndex=response.pagination.pageIndex;
    this.pageSize=response.pagination.pageSize;

    this.loading =false;
   });
  }
  PageIndexChange(index: any): void {
    console.log(index);
    this.pageIndex=index;
    this.loading =true;
    if(this.searchProject.value?.length>1 && this.searchStateFound==true)
    {

this.projectService.getWithPagnationResut(index, 10,this.searchProject.value)
   .subscribe((response:PaginatedResult<Project[]>)=>{
    this.projects=response.data;
    this.pageIndex=response.pagination.pageIndex;
    this.pageSize=response.pagination.pageSize;

    this.loading =false;
   });
  }else{

    this.projectService.getWithPagnationResut(index, 10)
    .subscribe((response:PaginatedResult<Project[]>)=>{

     this.projects=response.data;
     this.pageIndex=response.pagination.pageIndex;
     this.pageSize=response.pagination.pageSize;
     this.loading =false;
    });
    this.searchStateFound=false;
  }

  }

  constructor(private  projectService:ProjectService,private notification: NzNotificationService
    ) {}

  ngOnInit(): void {

    this.projectService.getWithPagnationResut(1,10).subscribe((response:PaginatedResult<Project[]>)=>{
      this.projects=response.data;
      this.pageIndex=response.pagination.pageIndex;
      this.pageSize=response.pagination.pageSize;
      this.total=response.pagination.totalRecord
      this.totalPage=response.pagination.totalPage;
      this.loading =false;
      this.projectService.setFristPageOfProjects(response);
   console.log(this.projects)
     });

     this.projectService.fristPagantionProjects$.subscribe((response:PaginatedResult<Project[]>)=>{
      this.projects=response.data;
      this.pageIndex=response.pagination.pageIndex;
      this.pageSize=response.pagination.pageSize;
      this.total=response.pagination.totalRecord
      this.totalPage=response.pagination.totalPage;
      this.loading =false;
     });


   this.searchProject.valueChanges.pipe(
     debounceTime(3000)
   ).subscribe(()=>{
      if(this.searchProject.value?.length>1)
          {
          this.loading=true;
      this.projectService.getWithPagnationResut(1,10,this.searchProject.value).subscribe((response:PaginatedResult<Project[]>)=>{

        if(response?.data.length>0)
        {
          this.loading=false;
          this.projects=response.data;
          this.pageIndex=response.pagination.pageIndex;
          this.pageSize=response.pagination.pageSize;
          this.total=response.pagination.totalRecord
          this.totalPage=response.pagination.totalPage;
          this.searchStateFound=true;
         }
         else{

             this.loading=false;
          this.projects= [] as Project[];
          this.pageIndex= 0
          this.pageSize= 0;
          this.total= 0
          this.totalPage= 0;
          this.searchStateFound=false;
          this.notification
          .blank(
            '  Project not found',
            '', { nzPlacement:"bottomLeft" }
          )

         }


       })





          }else{
            this.projects= this.projectService.getFirsttPageValue().data;
            this.pageIndex= this.projectService.getFirsttPageValue().pagination.pageIndex;
            this.pageSize= this.projectService.getFirsttPageValue().pagination.pageSize;
            this.total= this.projectService.getFirsttPageValue().pagination.totalRecord
            this.totalPage= this.projectService.getFirsttPageValue().pagination.totalPage;

          }
   })




  }

}



