import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { defaultEmployeeIdNumberPrefices } from "../../../../Services/supporting-services/basic-data.collection";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";

@Component({
    selector: 'exec-epp-custom-phone',
    templateUrl: './custom-phone.component.html',
    styleUrls: ['./custom-phone.component.scss']
  })
export class CustomPhoneNumberComponent implements OnInit {

    // @Input() formItem: FormItemData = defaultFormItemData
    label = 'Phone Number'
    prefices$: Observable<any> = of([{country:'Ethiopia', code:'+251'}])
    @Input() labelConfig = defaultFormLabellParameter
    @Input() prefixControlConfig = defaultFormControlParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() prefixControl: FormControl = new FormControl()
    @Input() myControl: FormControl = new FormControl()
    
    required = true
    errMessage = ''


    constructor() {
    }

    ngOnInit(): void {
    }

    onChange() {
      this.errMessage = commonErrorMessage.message.substring(0)
    }

}