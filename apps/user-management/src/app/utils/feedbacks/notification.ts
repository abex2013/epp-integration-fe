import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { INotification } from '../../interfaces/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationBar {
  constructor(private notification: NzNotificationService) {}

  showNotification({
    type = '',
    content,
    title = '',
    position = 'topRight',
    duration = 5000,
  }: INotification): void {
    this.stopNotification();
    this.notification.create(type, title, content, {
      nzPlacement: position,
      nzDuration: duration,
    });
  }
  stopNotification(): void {
    this.notification.remove();
  }
}
