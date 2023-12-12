import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PageTemplateModule } from './shared/modules/templates/page-template.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/modules/shared.module';
import { ApplicationRoutingModule } from './app-routing.module';
import { httpInterceptor } from './interceptor/httpInterceptor';
import { errorInterceptor } from './interceptor/errorInterceptor';
import { UserManagementModule } from './modules/userManagment/user-management.module';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ApplicationRoutingModule,
    PageTemplateModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    UserManagementModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: errorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
