import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  @Input() disabled = false;
  @Input() label: string | any = null;
  @Input() labelMuted: string | any = null;
  @Input() placeholder = '';
  @Input() selectedValue: any;
  @Input() list: any[] = [];
  @Input() multiple = false;
  @Input() showArrow = true;
  @Input() custom = false;
  @Input() maxNumber = 20;
  @Input() enableHidding = false;
  @Input() selectedSoFar : any;
  @Input() isRequired = true;
  @Input() errorMsg = '';
  @Input() showErrorIcon = true;
  @Input() displayError = false;
  @Input() focusout = false;
  @Input() fcn = '';
  @Input() form: any;
  @Input() valid = false;

  @Output() actionChange: EventEmitter<any> = new EventEmitter<any>();

  optionList: any = [];

  compareFn = (o1: any, o2: any) =>
    o1 && o2 ? o1.dial_code === o2.dial_code && o1.name === o2.name : o1 === o2;

  log(value: { name: string; dial_code: string; code: number }): void {
    this.actionChange.emit(value);
  }

  isNotSelected(value : any){
    return this.selectedSoFar.indexOf(value) === -1; 
  }
  onfocustout() {
    this.focusout = true;
  }
  onfocus() {
    this.focusout = false;
  }
}