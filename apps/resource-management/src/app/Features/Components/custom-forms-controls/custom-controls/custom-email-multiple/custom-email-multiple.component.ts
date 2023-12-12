import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormControlParameter, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { defaultEmployeeIdNumberPrefices } from "../../../../Services/supporting-services/basic-data.collection";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";
import { FormGenerator } from "../../form-generator.model";
import { ExcelControlResponseType } from "../../shared/excel-control-response-type.enum";
import { ExcelButtonResponse } from "../../shared/exel-control-response.model";

@Component({
    selector: 'exec-epp-custom-email-multiple',
    templateUrl: './custom-email-multiple.component.html',
    styleUrls: ['./custom-email-multiple.component.scss']
})
export class CustomEmailMultipleComponent implements OnInit {

    // @Input() formItem: FormItemData = defaultFormItemData
    label = 'Email Address'
    @Input() maxAmount = 3
    @Input() labelConfig = defaultFormLabellParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() formArray: FormArray = new FormArray([])

    @Output() reply = new EventEmitter<boolean>()
    required = true
    errMessages: string[] = []


    constructor(
        private readonly _formGenerator: FormGenerator
    ) {
    }

    ngOnInit(): void {
        for (let i = 0; i < this.formArray.length; i++) {
            this.errMessages.push('')
        }
    }

    getControl(index: number): FormControl {
        const formControl = this._formGenerator.getFormControlfromArray(index, this.formArray)
        if(formControl) {
            return formControl
        }
        return new FormControl
        
    }

    onAddRemove(event: ExcelButtonResponse) {
        if(event.action == ExcelControlResponseType.ExcelAdd) {
            this.add()
        } else if (event.action == ExcelControlResponseType.ExcelRemove) {
            this.remove(event.data as number)
        } else {
            alert('Invalid action')
        }
    }

    add() {
        if ((this.formArray.length === this.maxAmount)
            || this.maxAmount == 1) {
            window.alert('Exceeds the allowed number of phones!')
            return
        }
        this.formArray.push(
            this._formGenerator.createEmailControl()
        )
        this.errMessages.push('')
    }

    remove(index: number) {
        if ((this.formArray.length === 1 && this.required)
            || this.maxAmount == 1) {
            window.alert('At least one email is required!')
            return
        }
        this.formArray.removeAt(index)
        this.errMessages = [
            ...this.errMessages.slice(0, index),
            ...this.errMessages.slice(index + 1),
        ]
    }

    onChange(index: number) {
        this.errMessages[index] = commonErrorMessage.message.substring(0)
    }

}