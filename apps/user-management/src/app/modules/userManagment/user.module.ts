import { NgModule } from '@angular/core';

import { SiderComponent } from '../../components/application/sider/sider.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MsalModule } from '@azure/msal-angular';
import{MsalService} from '@azure/msal-angular';
import{MSAL_INSTANCE} from '@azure/msal-angular';

import{IPublicClientApplication , PublicClientApplication} from '@azure/msal-browser'

export function MSALInstanceFactory(): IPublicClientApplication
{
  return new PublicClientApplication({
    auth:{
      clientId: '5330d43a-fef4-402e-82cc-39fb061f9b97',
      redirectUri: 'http://localhost:4200'
    }
  })

}
@NgModule({
  declarations: [SiderComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,         
    SharedModule,
    MsalModule
  ],   
  providers:[ 
    {    
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory
  },
  MsalService
]
  
})
export class ApplicationModule { }
