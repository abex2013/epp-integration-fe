import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobRequisitionComponent } from '../../components/job-requisition/job-requisition/job-requisition.component';
import { CreateJobRequisitionComponent } from '../../components/job-requisition/create-job-requisition/create-job-requisition.component';
import { SecondaryPageTemplateComponent } from '../../shared/components/page-view-templates/secondary-template/secondary-page-template.component';

const routes: Routes = [
  {
    path: '',
    component: SecondaryPageTemplateComponent,
    children: [
      {
        path: '',
        component: JobRequisitionComponent,
      },
      {
        path: 'create-job-requisition',
        component: CreateJobRequisitionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobRequisitionRoutingModule {}
