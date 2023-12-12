import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../models/apiService';
import { ProjectStatus } from '../models/get/projectStatus';

@Injectable({
  providedIn: 'root'
})

export class ProjectStatusService  extends ApiService<ProjectStatus> {

  // projectStatus:ProjectStatus[]=[
  //   {  Guid: "3fa85f64-5717-6762-b3fc-fe963f66afa9",
  //   IsActive: true,
  //   IsDeleted: true,
  //   CreatedDate: new Date(),
  //   CreatedbyUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   StatusName: "On hold",
  //   AllowResource: false
  //   }
  //  ,
  //   {  Guid: "3fa85f64-5717-6762-b3fc-fe963f66afa7",
  //   IsActive: true,
  //   IsDeleted: true,
  //   CreatedDate: new Date(),
  //   CreatedbyUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   StatusName: "Terminated",
  //   AllowResource: false
  //   }
  //   ,
  //   {  Guid: "3fa85f64-5717-6762-b3fc-fe963f66afa6",
  //   IsActive: true,
  //   IsDeleted: true,
  //   CreatedDate: new Date(),
  //   CreatedbyUserGuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  //   StatusName: "Active",
  //   AllowResource: true
  //   }]



  constructor(protected httpClient: HttpClient ) { 
    super(httpClient);
  }

  getResourceUrl(): string {
    return 'ProjectStatus';
  }

  getProjecUS():ProjectStatus[]  {
    return  [] as ProjectStatus[];
  }


}