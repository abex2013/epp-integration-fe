import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimaryPageTemplateComponent } from './shared/components/page-view-templates/primary-template/primary-page-template.component';
const routes: Routes = [
  {
    path: '',
    component: PrimaryPageTemplateComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'user' },
      {
        path: 'user',
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'application',
        loadChildren: () =>
          import('./modules/application/application.module').then(
            (m) => m.ApplicationModule
          ),
      },
    ],
  },

  {
    path: 'job-requisition',
    loadChildren: () =>
      import('./modules/job-requisition/job-requisition.module').then(
        (m) => m.JobRequisitionModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
