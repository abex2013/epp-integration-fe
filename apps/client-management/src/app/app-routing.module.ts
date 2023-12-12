import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path:'',pathMatch: 'full', redirectTo: '/clients'},
{
  path: 'clients',
  loadChildren: () =>
    import('./clients/clients.module').then((m) => m.ClientsModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
