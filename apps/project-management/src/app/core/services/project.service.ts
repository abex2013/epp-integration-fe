import { ApiService } from '../models/apiService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult, Project, ProjectCreate } from '../models';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends ApiService<Project> {

  
private fristPagantionProjectsSource=  new BehaviorSubject<PaginatedResult<Project[]>>(  {} as PaginatedResult<Project[]>);
fristPagantionProjects$=this.fristPagantionProjectsSource.asObservable();


  constructor(protected httpClient: HttpClient,private  notification: NzNotificationService,private router:Router ) { 
    super(httpClient);
  }




getFirsttPageValue()
{   
  return this.fristPagantionProjectsSource.value;
}

setFristPageOfProjects(data:PaginatedResult<Project[]>)
{
  this.fristPagantionProjectsSource.next(data);
  
}



  getResourceUrl(): string {

    return 'Project';
  }



  createProject(data:ProjectCreate)
   {
 console.log(data)

     this.post(data).subscribe
         ((error)=>{
           this.notification.success('Project Added successfully','');  
           
  this.getWithPagnationResut(1,10).pipe(map((response:PaginatedResult<Project[]>)=>{
    this.fristPagantionProjectsSource.next(response);
   }))


        }               
           ,(errr:any)=>{
          
              this.notification.error('Project Not saved','Please try again letter');
            }
           )
  }

  getProjects()
  {
  return  this.httpClient.get(environment.baseApiUrl+"Project/all").pipe(map((response:any)=>{
     
        return response.Data;
        
    }))
  }
  

}
