import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from '@exec-epp/ng-zorro';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { FormTableComponent } from './form-table/form-table.component';
import { ButtonComponent } from './button/button.component';
import { HeaderLineComponent } from './header-line/header-line.component';





@NgModule({
  declarations: [BreadCrumbComponent,HeaderComponent, FooterComponent, FormTableComponent, ButtonComponent, HeaderLineComponent],
  imports: [
  RouterModule,
  NgZorroModule,
  CommonModule
  ],
  exports:[BreadCrumbComponent,HeaderComponent,FooterComponent,FormTableComponent,NgZorroModule,ButtonComponent,HeaderLineComponent]
 

})
export class SharedModule { }
