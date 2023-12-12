import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResult, Project, ProjectService } from '../../core';
import { ActiveTabService } from './servicee/active-tab.service';

@Component({
  selector: 'exec-epp-client-project',
  templateUrl: './client-project.component.html',
  styleUrls: ['./client-project.component.scss']
})
export class ClientProjectComponent implements OnInit  {

  activeTabIndex=0;
  constructor(private router:Router,private projectService:ProjectService,private activeTabService:ActiveTabService) {

   }
   clientSelected=true;




 
     ngOnInit(): void {
      this.projectService.getWithPagnationResut(1,10).subscribe((response:PaginatedResult<Project[]>)=>{   
   
        this.projectService.setFristPageOfProjects(response);
       });

      this.activeTabService.isClientTabActiv$.subscribe(res=>{
         this.activeTabIndex=res;
      })
     }
   


  clientTab()
  {
    this.clientSelected=false;
 
  }

  projectTab()
{
  this.clientSelected=false;

}

addProjectPage()
{
  this.router.navigateByUrl('client-project/add-project');
 
}

}
