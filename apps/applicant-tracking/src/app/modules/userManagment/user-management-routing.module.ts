import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiderComponent } from '../../components/application/sider/sider.component';
import { GroupsetComponent } from '../../features/components/groupset/groupset.component';

const routes: Routes = [
  {
    path: '',
    component: SiderComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'users' },
      {
        path: 'users',
        component: GroupsetComponent
      },
      {
        path: 'groups',
        component: GroupsetComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
