import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import data from '../../../../../assets/files/CountryCodes.json';

@Component({
  selector: 'app-country-selector',
  templateUrl: './country-selector.component.html',
  styleUrls: ['./country-selector.component.css'],
})
export class CountrySelectorComponent implements OnInit {
  @Input() label: string | any = null;
  @Input() placeholder = '';
  @Input() errorMsg = '';
  @Input() selectedValue: any;
  @Input() single = false;
  @Input() isRequired = true;

  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
  optionList: any = [];
  ngOnInit(): void {
    this.optionList = data;
  }

  compareFn = (o1: any, o2: any) =>
    o1 && o2 ? o1.dial_code === o2.dial_code && o1.name === o2.name : o1 === o2;

    compareItem = (o1: any, o2: any) => o1 === o2;

  log(value: { name: string; dial_code: string; code: number }): void {
    this.onChange.emit(value);
  }
  logVal(value: string): void {
    this.onChange.emit(value);
  }
}
