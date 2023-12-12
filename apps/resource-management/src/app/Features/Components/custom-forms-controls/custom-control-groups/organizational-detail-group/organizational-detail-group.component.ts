import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { AddressCountryStateService } from "../../../../Services/external-api.services/countries.mock.service";
import { EmployeeStaticDataMockService } from "../../../../Services/external-api.services/employee-static-data.mock.service";
import { FormGenerator } from "../../form-generator.model";

@Component({
    selector: 'exec-epp-organizational-details-group',
    templateUrl: './organizational-detail-group.component.html',
    styleUrls: ['./organizational-detail-group.component.scss']
})
export class OrganizationalDetailGroupComponent implements OnInit {

    formGroup: FormGroup

    countries$: Observable<SelectOptionModel[]>
    dutyStations$: Observable<SelectOptionModel[]>
    jobTitles$: Observable<SelectOptionModel[]>
    businessUnits$: Observable<SelectOptionModel[]>
    reportingManagers$: Observable<SelectOptionModel[]>
    departments$: Observable<SelectOptionModel[]>
    employementTypes$: Observable<SelectOptionModel[]>
    employementStatuses$: Observable<SelectOptionModel[]>

    joinigStartDate = new Date(Date.now())
    terminationStartDate = new Date(Date.now())

    isContract = false

    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _addressCountryStateService: AddressCountryStateService,
        private readonly _employeeStaticDataService: EmployeeStaticDataMockService
    ) {
        this.countries$ = this._addressCountryStateService.countries$
        this.dutyStations$ = this._employeeStaticDataService.dutyStations$
        this.jobTitles$ = this._employeeStaticDataService.jobTitles$
        this.businessUnits$ = this._employeeStaticDataService.businessUnits$
        this.departments$ = this._employeeStaticDataService.departments$
        this.employementTypes$ = this._employeeStaticDataService.employementTypes$
        this.reportingManagers$ = this._employeeStaticDataService.reportingManagers$
        this.employementStatuses$ = this._employeeStaticDataService.employementStatuses$
        

        this.formGroup
            = this._formGenerator.organizationalForm

    }

    ngOnInit(): void {}

    getControl(name: string): FormControl {
        return this._formGenerator.getFormControl(name, this.formGroup)
    }

    getFormArray(name: string): FormArray {
        return this._formGenerator.getFormArray(name, this.formGroup)
    }

    onEmployementTypeChange() {
        const value: string = this.getControl('employeementType').value
        if(value.search('Permanent') < 0){
            this.isContract = true
        } else {
            this.isContract = false
        }
    }

}