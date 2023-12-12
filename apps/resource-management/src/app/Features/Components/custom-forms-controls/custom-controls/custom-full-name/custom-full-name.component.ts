import { Component, Input, OnInit, Output } from "@angular/core";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { defaultFormItemConfig } from "../../../../Models/supporting-models/form-control-config.model";
import { defaultFormItemData, FormControlData, FormItemData, FormLabelData } from "../../../../Models/supporting-models/form-error-log.model";
import { ValidatorResponse } from "../../../../Models/supporting-models/validator-response.model";
import { commonErrorMessage, validateFirstName, validateLastName, validateMiddleName } from "../../../../Services/supporting-services/custom.validators";
import { FormGenerator } from "../../form-generator.model";

const errorMessageRequired: ValidatorResponse =
{
    required: true,
    message: ''
}
const errorMessageOptional: ValidatorResponse =
{
    required: false,
    message: ''
}

@Component({
    selector: 'exec-epp-custom-full-name',
    templateUrl: './custom-full-name.component.html',
    styleUrls: ['./custom-full-name.component.scss']
  })
export class CustomFullNameComponent implements OnInit {

    @Input() formGroup: FormGroup = new FormGroup({})

    constructor(
        private readonly _formGenerator: FormGenerator
    ) {
    }

    ngOnInit(): void {
    }

    getFirstNameControl() {
        return this._formGenerator.getFormControl('firstName', this.formGroup)
    }

    getMiddleNameControl() {
        return this._formGenerator.getFormControl('middleName', this.formGroup)
    }

    getLastNameControl() {
        return this._formGenerator.getFormControl('lastName', this.formGroup)
    }

}