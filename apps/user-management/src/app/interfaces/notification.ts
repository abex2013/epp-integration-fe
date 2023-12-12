import { NzNotificationPlacement } from 'ng-zorro-antd/notification';

export interface INotification {
  type?: string;
  title?: string;
  content: any;
  position?: NzNotificationPlacement;
  duration?: number;
}
