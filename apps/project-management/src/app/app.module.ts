import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';


import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgZorroModule } from '@exec-epp/ng-zorro';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ProjectCreateComponent } from './features/project/pages/project-create/project-create.component';
import { HeaderComponent } from './core/header/header.component';
import en from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { ClientProjectComponent } from './features/client-project/client-project.component';
import { ProjectModule } from './features/project/project.module';
import { AppComponent } from './app.component';

registerLocaleData(en);
@NgModule({
  declarations: [
    AppComponent,
    ProjectCreateComponent,
    ClientProjectComponent,
     HeaderComponent

  ],
  imports: [
    AppRoutingModule,
    ProjectModule,
    NzIconModule ,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserModule,
    NgZorroModule,
    AppRoutingModule,

  ],
  providers: [ { provide: NZ_I18N, useValue: en_US }],
  exports:[AppComponent],

  bootstrap: [AppComponent],
})
export class AppModule {}
