import { NgModule } from '@angular/core';

import { ApplicationRoutingModule } from './application-routing.module';
import { SiderComponent } from '../../components/application/sider/sider.component';
import { PersonalInformationComponent } from '../../components/application/personal-information/personal-information.component';
import { AreaOfInterestComponent } from '../../components/application/areas-of-interest/area-of-interest.component';
import { EducationComponent } from '../../components/application/education/education.component';
import { WorkExperienceComponent } from '../../components/application/work-experience/work-experience.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SiderComponent, PersonalInformationComponent, AreaOfInterestComponent,EducationComponent, WorkExperienceComponent],
  imports: [
    ApplicationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ApplicationModule { }
