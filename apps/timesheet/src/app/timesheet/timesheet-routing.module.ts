import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { ViewSubmissionsComponent } from './components/view-submissions/view-submissions.component';
import { TimesheetDetailComponent } from './components/timesheet-detail/timesheet-detail.component';

import { TimesheetComponent } from './timesheet.component';

const routes: Routes = [
  {
    path: "",
    component: TimesheetComponent,
    children: [
      {
        path: "",
        component: TimesheetDetailComponent
      },
      {
        path: "view-submissions",
        component: ViewSubmissionsComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TimesheetRoutingModule { }
