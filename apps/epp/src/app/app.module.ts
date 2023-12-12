import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgZorroModule } from '@exec-epp/ng-zorro'

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import en from '@angular/common/locales/en';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
registerLocaleData(en);


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    NgZorroModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
