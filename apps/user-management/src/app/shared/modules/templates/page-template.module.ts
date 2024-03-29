import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { PrimaryPageTemplateComponent } from '../../components/page-view-templates/primary-template/primary-page-template.component';
import { SecondaryPageTemplateComponent } from '../../components/page-view-templates/secondary-template/secondary-page-template.component';
import { AntdFormModule } from '../forms/antd-form.module';
import { CustomFormModule } from '../forms/custom-form.module';
import { SiderComponent } from '../../../components/application/sider/sider.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SiderComponent, 
    PrimaryPageTemplateComponent,
    SecondaryPageTemplateComponent, 
  ],
  imports: [BrowserModule, RouterModule, AntdFormModule, CustomFormModule],
  exports: [PrimaryPageTemplateComponent, SecondaryPageTemplateComponent],
})
export class PageTemplateModule {} 