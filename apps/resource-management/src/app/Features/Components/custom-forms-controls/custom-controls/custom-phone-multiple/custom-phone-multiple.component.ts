import { splitClasses } from "@angular/compiler";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormControlParameter, defaultFormItemData, defaultFormLabellParameter, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { AddressCountryStateService, CountriesMockService } from "../../../../Services/external-api.services/countries.mock.service";
import { defaultEmployeeIdNumberPrefices } from "../../../../Services/supporting-services/basic-data.collection";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";
import { FormGenerator } from "../../form-generator.model";
import { ExcelControlResponseType } from "../../shared/excel-control-response-type.enum";
import { ExcelButtonResponse } from "../../shared/exel-control-response.model";

@Component({
    selector: 'exec-epp-custom-phone-multiple',
    templateUrl: './custom-phone-multiple.component.html',
    styleUrls: ['./custom-phone-multiple.component.scss']
})
export class CustomPhoneNumberMultipleComponent implements OnInit {

    // @Input() formItem: FormItemData = defaultFormItemData
    label = 'Phone Number'
    prefices$: Observable<any> = of([{ country: 'Ethiopia', code: '+251' }])
    @Input() maxAmount = 1
    @Input() labelConfig = defaultFormLabellParameter
    @Input() prefixControlConfig = defaultFormControlParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() formArray: FormArray = new FormArray([])

    @Output() reply: EventEmitter<boolean> = new EventEmitter<boolean>()
    required = true
    errMessages: string[] = []

    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _addressCountryStateService: CountriesMockService
    ) {
        this.prefices$ = this._addressCountryStateService.getCountriesPhonePrefices()
    }

    ngOnInit(): void {
        for (let i = 0; i < this.formArray.length; i++) {
            this.errMessages.push('')
        }
    }

    getPrefixControl(index: number): FormControl {
        const formGroup = this._formGenerator.getFormGroupfromArray(index, this.formArray)
        if(formGroup) {
            return this._formGenerator.getFormControl('prefix', formGroup)
        }
        return new FormControl()
    }

    getControl(index: number): FormControl {
        const formGroup = this._formGenerator.getFormGroupfromArray(index, this.formArray)
        if(formGroup) {
            return this._formGenerator.getFormControl('phone', formGroup)
        }
        return new FormControl()
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
            this._formGenerator.createPhoneNumberFormGroup()
        )
        this.errMessages.push('')
    }

    remove(index: number) {
        if ((this.formArray.length === 1 && this.required)
            || this.maxAmount == 1) {
            window.alert('At least one phone is required!')
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