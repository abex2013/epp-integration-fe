import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IMessage } from '../../interfaces/message';

@Injectable({
  providedIn: 'root',
})
export class MessageBar {
  constructor(private message: NzMessageService) {}

  showMessage({
    type = '',
    content,
    duration = 0,
    animate = true,
  }: IMessage): void {
    this.stopMessage();
    this.message.create(type, content, {
      nzDuration: duration,
      nzAnimate: animate,
    });
  }
  stopMessage(): void {
    this.message.remove();
  }
}
