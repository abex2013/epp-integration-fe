import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { NzCalendarModule } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {
  @Input() disabled = false;
  @Input() enabled = true;
  @Input() disableEndDate = false
  @Input() loading = false;
  @Input() show:NzCalendarModule = 'default';
  @Input() focusout = false;
  @Input() displayError = false;
  @Input() type = 'text';
  @Input() name = '';
  @Input() isRequired = false;
  @Input() label: string | any = null;
  @Input() placeholder =  '';
  @Input() errorMsg = '';
  @Input() suffixIcon: any;
  @Input() prefixIcon: any;
  @Input() fcn = '';
  @Input() form: any;
  @Input()  disabledDate: any;

  
  selectedStatus!: string;

  currentDate = Date.now.toString();

   projectStartdDate={}as Date;
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  onValueChage(e:any){
    this.valueChange.emit(e);
  }
}