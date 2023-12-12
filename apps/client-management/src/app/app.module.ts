import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';

registerLocaleData(en);
@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    BrowserModule,
    NzIconModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,


  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  exports: [AppComponent],

  bootstrap: [AppComponent],
})
export class AppModule {}
