import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { EppdashboardComponent } from './features/components/eppdashboard/eppdashboard.component';
import { Component, NgModule } from '@angular/core';
import { SiderComponent } from './components/application/sider/sider.component';
import { UserDashboardComponent } from './features/components/user-dashboard/user-dashboard.component';
import { PrimaryPageTemplateComponent } from './shared/components/page-view-templates/primary-template/primary-page-template.component';
import { UserdetailsComponent } from './features/components/userdetails/userdetails.component';
import { MicrosoftLoginGuard } from './features/Account/signin/microsoft-login.guard';

const routes: Routes = [
  { path: '', component: PrimaryPageTemplateComponent, canActivate: [MicrosoftLoginGuard],
  children: [
    {
      path: '',component: EppdashboardComponent
    },
  ], 
}, 
  { path: 'sider', component: SiderComponent},
  { path: 'user-dashboard', component: UserDashboardComponent},
  { path: 'user-detail', component: UserdetailsComponent },

  { path: 'users', component: PrimaryPageTemplateComponent,
      children: [
        {
          path: '',
          loadChildren: () =>
            import('./modules/userManagment/user-management.module').then((m) => m.UserManagementModule)
        },
      ], 
    }, 
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
//routing