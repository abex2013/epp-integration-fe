import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { FormControlResponseModel } from "../../../../Models/supporting-models/form-control-response.model";
import { defaultFormControlParameter, defaultFormLabellParameter } from "../../../../Models/supporting-models/form-error-log.model";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { commonErrorMessage } from "../../../../Services/supporting-services/custom.validators";
import { FormGenerator } from "../../form-generator.model";
import { FormControlType } from "../../../../Models/supporting-models/form-control-name-type.enum"
import { EmployeeStaticDataMockService } from "../../../../Services/external-api.services/employee-static-data.mock.service";

@Component({
    selector: 'exec-epp-custom-employee-id-number',
    templateUrl: './custom-employee-id-number.component.html',
    styleUrls: ['./custom-employee-id-number.component.scss']
  })
export class CustomEmployeeIdNumberComponent implements OnInit {

    @Input() label = 'Employee Identification Number'
    @Input() labelConfig = defaultFormLabellParameter
    @Input() prefixControlConfig = defaultFormControlParameter
    @Input() controlConfig = defaultFormControlParameter
    @Input() formGroup: FormGroup = new FormGroup({})
    @Input() required = true
    @Input() formDescription: FormControlResponseModel = {} as FormControlResponseModel

    @Output() formResponse = new EventEmitter()

    prefices$: Observable<SelectOptionModel[]> = of([])
    errMessage = ''

    constructor(
      private readonly _employeeStaticDataMockService: EmployeeStaticDataMockService,
      private readonly _formGenerator: FormGenerator
    ) {
      this.prefices$ = this._employeeStaticDataMockService.employeeIdNumberPrefices$
    }

    ngOnInit(): void {
    }

    getPrefix() {
      return this._formGenerator.getFormControl('prefix', this.formGroup)
    }
    getIdNumber() {
      return this._formGenerator.getFormControl('idNumber', this.formGroup)
    }

    onPrefixSelect() {

    }

    onChange() {
      this.errMessage = commonErrorMessage.message.substring(0)
      this.formResponse.emit()
    }

}