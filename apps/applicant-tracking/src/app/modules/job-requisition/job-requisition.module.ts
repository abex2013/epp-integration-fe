import { NgModule } from '@angular/core';
import { JobRequisitionRoutingModule } from './job-requisition-routing.module';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderHeroComponent } from '../../components/header-hero/header-hero.component';
import { JobRequisitionComponent } from '../../components/job-requisition/job-requisition/job-requisition.component';
import { CreateJobRequisitionComponent } from '../../components/job-requisition/create-job-requisition/create-job-requisition.component';
@NgModule({
  declarations: [HeaderHeroComponent, JobRequisitionComponent, CreateJobRequisitionComponent],
  imports: [
    JobRequisitionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class JobRequisitionModule {}
