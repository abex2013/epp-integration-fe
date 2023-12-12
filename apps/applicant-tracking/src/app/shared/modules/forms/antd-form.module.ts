import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import {
  EyeInvisibleOutline,
  LockOutline,
  UserOutline,
  DeleteOutline,
  PlusOutline,
  DownloadOutline,
  NotificationOutline,
  SettingOutline,
  QuestionCircleOutline,
  AlertOutline,
  BellOutline,
} from '@ant-design/icons-angular/icons';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
const icons: any[] = [
  EyeInvisibleOutline,
  LockOutline,
  UserOutline,
  DeleteOutline,
  PlusOutline,
  DownloadOutline,
  NotificationOutline,
  SettingOutline,
  QuestionCircleOutline,
  AlertOutline,
  BellOutline,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzButtonModule,
    NzMenuModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    NzIconModule.forRoot(icons),
    NzModalModule,
    NzMessageModule,
    NzUploadModule,
    NzDropDownModule,
    NzSelectModule,
    NzAvatarModule,
    NzNotificationModule,
    NzTableModule,
    NzDividerModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzToolTipModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzBadgeModule,
    NzTabsModule,
  ],
  exports: [
    NzLayoutModule,
    NzButtonModule,
    NzMenuModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    NzIconModule,
    NzGridModule,
    NzModalModule,
    NzMessageModule,
    NzUploadModule,
    NzDropDownModule,
    NzSelectModule,
    NzAvatarModule,
    NzNotificationModule,
    NzTableModule,
    NzDividerModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzToolTipModule,
    NzPageHeaderModule,
    NzBreadCrumbModule,
    NzBadgeModule,
    NzTabsModule,
  ],
})
export class AntdFormModule {}
