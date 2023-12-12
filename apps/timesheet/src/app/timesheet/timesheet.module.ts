import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzDrawerModule} from "ng-zorro-antd/drawer"
import {NzSelectModule} from "ng-zorro-antd/select"
import {NzInputModule} from "ng-zorro-antd/input"
import {NzPopoverModule} from "ng-zorro-antd/popover"
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import {NzModalModule} from "ng-zorro-antd/modal";
import { NzToolTipComponent, NzToolTipModule } from "ng-zorro-antd/tooltip";


import {TimesheetComponent} from "./timesheet.component"
import {TimesheetRoutingModule} from './timesheet-routing.module';
import {TimesheetHeaderComponent} from './components/timesheet-header/timesheet-header.component';
import {DateSelectorComponent} from './components/date-selector/date-selector.component';
import {DayAndDateColumnComponent} from './components/day-and-date-column/day-and-date-column.component';
import {ProjectNamePaletComponent} from './components/project-name-palet/project-name-palet.component';

import { MoreProjectsComponent } from './components/more-projects/more-projects.component';
import { TimesheetValidationService } from './services/timesheet-validation.service';
import { TimesheetService } from './services/timesheet.service';
import { ViewSubmissionsComponent } from './components/view-submissions/view-submissions.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { TimesheetDetailComponent } from './components/timesheet-detail/timesheet-detail.component';



@NgModule({
  declarations: [
    TimesheetComponent,
    TimesheetHeaderComponent,
    DateSelectorComponent,
    DayAndDateColumnComponent,
    ProjectNamePaletComponent,
    MoreProjectsComponent,
    ViewSubmissionsComponent,
    TimesheetDetailComponent
  ],
  imports: [
    CommonModule,
    TimesheetRoutingModule,
    NzBreadCrumbModule,
    NzButtonModule,
    NzIconModule,
    NzDatePickerModule,
    NzDrawerModule,
    NzSelectModule,
    NzInputModule,
    NzPopoverModule,
    FormsModule,
    NzLayoutModule,
    ReactiveFormsModule,
    NzFormModule,
    NzNotificationModule,
    NzDividerModule,
    NzModalModule,
    NzTableModule,
    NzToolTipModule,
    NzPaginationModule
  ],
  exports: [TimesheetHeaderComponent],
  providers: [TimesheetValidationService,TimesheetService],
})
export class TimesheetModule {
}
