import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzButtonType } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() type:NzButtonType = 'default';
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  onClicked(e:any){
    this.onClick.emit(e);
  }

}
