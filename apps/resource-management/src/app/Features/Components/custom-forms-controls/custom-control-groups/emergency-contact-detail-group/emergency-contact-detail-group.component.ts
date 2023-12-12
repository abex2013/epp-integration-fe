import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { EmployeeStaticDataMockService } from "../../../../Services/external-api.services/employee-static-data.mock.service";
import { FormGenerator } from "../../form-generator.model";

@Component({
    selector: 'exec-epp-emergency-contact-detail-group',
    templateUrl: './emergency-contact-detail-group.component.html',
    styleUrls: ['./emergency-contact-detail-group.component.scss']
})
export class EmergencyContactDetailGroupComponent implements OnInit {

    formGroup: FormGroup
    maxEmailQty = 3
    maxPhoneQty = 3

    relationships$: Observable<SelectOptionModel[]>


    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _employeeStaticDataService: EmployeeStaticDataMockService
    ) {
        this.relationships$=this._employeeStaticDataService.relationships$
        this.formGroup
            = this._formGenerator.emergencyContact

    }

    ngOnInit(): void {
        this.showData()
    }

    getControl(name: string): FormControl {
        return this._formGenerator.getFormControl(name, this.formGroup)
    }

    getFormArray(name: string): FormArray {
        return this._formGenerator.getFormArray(name, this.formGroup)
    }

    getFormGroup(name: string): FormGroup {
        return this._formGenerator.getFormGroup(name, this.formGroup)
    }

    showData(event?: any) {
        console.log(this.formGroup.value)
        console.log(this.formGroup.valid)
    }

}