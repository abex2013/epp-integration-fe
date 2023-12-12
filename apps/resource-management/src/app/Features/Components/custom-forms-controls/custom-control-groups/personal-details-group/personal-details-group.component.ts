import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { AddressCountryStateService } from "../../../../Services/external-api.services/countries.mock.service";
import { EmployeeStaticDataMockService } from "../../../../Services/external-api.services/employee-static-data.mock.service";
import { ExternalCountryApiService } from "../../../../Services/external-api.services/external-countries.api.service";
import { maxEmployeeDateofBirth, minEmployeeDateofBirth } from "../../../../Services/supporting-services/basic-data.collection";
import { FormGenerator } from "../../form-generator.model";

@Component({
    selector: 'exec-epp-personal-details-group',
    templateUrl: './personal-details-group.component.html',
    styleUrls: ['./personal-details-group.component.scss']
})
export class PersonalDetailGroupComponent implements OnInit {

    formGroup: FormGroup
    genders$: Observable<SelectOptionModel[]>
    nationalities$: Observable<SelectOptionModel[]>
    maxDateofBirth = maxEmployeeDateofBirth? maxEmployeeDateofBirth: new Date(Date.now())
    maxEmailQty = 3
    maxPhoneQty = 3
    maxNationality = 3
    birthEndDate = new Date(Date.now())
    

    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _employeeStaticDataService: EmployeeStaticDataMockService,
        private readonly _addressCountryStateService: AddressCountryStateService
    ) {
        this.genders$ = this._employeeStaticDataService.genders$
        this.nationalities$ = this._addressCountryStateService.nationalities$
        this.formGroup = this._formGenerator.personalDetailsForm
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