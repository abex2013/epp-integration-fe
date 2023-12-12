import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { of } from "rxjs";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { defaultEmployeeIdNumberPrefices } from "../../../../Services/supporting-services/basic-data.collection";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";
import { FormControlResponseModel } from "../../../../Models/supporting-models/form-control-response.model"

@Component({
    selector: 'exec-epp-custom-datepicker',
    templateUrl: './custom-datepicker.component.html',
    styleUrls: ['./custom-datepicker.component.scss']
})
export class CustomDatepickerComponent implements OnInit {

    // @Input() formItem: FormItemData = defaultFormItemData
    @Input() label = 'Label'
    @Input() labelConfig = defaultFormLabellParameter
    @Input() prefixControlConfig = defaultFormControlParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() prefixControl: FormControl = new FormControl()
    @Input() myControl: FormControl = new FormControl()
    @Input() startingDate: Date = new Date(1900, 1, 1)
    @Input() endingDate: Date = new Date(2100, 1, 1)
    @Input() required = true

    @Output() formResponse = new EventEmitter()

    
    errMessage = ''

    prefices$ = of(defaultEmployeeIdNumberPrefices)

    constructor() {
    }

    ngOnInit(): void {
    }

    disabledDate = (startValue: Date): boolean => {
        return (
            (startValue.getTime() < this.startingDate.getTime())
            || (startValue.getTime() > this.endingDate.getTime())
        )
    }

    onChange() {
        this.errMessage = commonErrorMessage.message.substring(0)
        this.formResponse.emit()
    }

}