import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: "", component: HomeComponent, data: { breadcrumb: "Home" }},
  {
    path: "timesheet",
    loadChildren: () => import("./timesheet/timesheet.module").then(m => m.TimesheetModule),
    data: { breadcrumb: 'Timesheet'}
  },
  {
    path: "timesheet-approval",
    loadChildren: () => import("./timesheet-approval/timesheet-approval.module").then(m => m.TimesheetApprovalModule),
    data: { breadcrumb: 'Timesheet-approval'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
