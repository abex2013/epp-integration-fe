import { Component, Input } from '@angular/core';
import { NzTabPosition } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent {
  disabled = false;
  @Input() prefixContent: any;
  @Input() direction: NzTabPosition = 'left';
  @Input() tabs: any[] = [];
}
