import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";

import { TimesheetApprovalComponent } from './timesheet-approval.component';

const routes: Routes = [
  {
    path: "", component: TimesheetApprovalComponent},
    {path: ':id', component: TimesheetApprovalComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TimesheetApprovalRoutingModule { }
