import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  disabled = false;
  @Input() focusout = false;
  @Input() displayError = false;

  @Input() type = 'text';
  @Input() name = '';

  @Input() isRequired = false;
  @Input() label: string | any = null;
  @Input() placeholder = '';
  @Input() errorMsg = '';
  @Input() suffixIcon: any;
  @Input() prefixIcon: any;
  @Input() fcn = '';
  @Input() form: any;
  @Input() isCompact = false;
  @Input() maxLength = 1000;
  @Input() showErrorIcon = true;
  @Input() disablePaste = false;
  
  constructor() {}
  onfocustout() {
    this.focusout = true;
  }
  onfocus() {
    this.focusout = false;
  }
  preventPaste(e: any, prevent: any) {
    if (prevent) {
      e.preventDefault();
      return false;
    }
    return true;
  }
}
