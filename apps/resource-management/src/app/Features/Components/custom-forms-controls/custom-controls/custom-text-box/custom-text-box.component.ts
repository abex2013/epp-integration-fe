import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";

@Component({
    selector: 'exec-epp-custom-text-box',
    templateUrl: './custom-text-box.component.html',
    styleUrls: ['./custom-text-box.component.scss']
  })
export class CustomTextBoxComponent implements OnInit {

    // @Input() formItem: FormItemData = defaultFormItemData
    @Input() label = 'Label'
    @Input() labelConfig = defaultFormLabellParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() myControl: FormControl = new FormControl()
    @Input() required = true
    errMessage = ''

    constructor() {
    }

    ngOnInit(): void {
    }

    onChange() {
      this.errMessage = commonErrorMessage.message.substring(0)
    }

}