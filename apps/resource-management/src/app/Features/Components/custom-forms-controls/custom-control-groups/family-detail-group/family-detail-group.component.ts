import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { EmployeeStaticDataMockService } from "../../../../Services/external-api.services/employee-static-data.mock.service";
import { FormGenerator } from "../../form-generator.model";

@Component({
    selector: 'exec-epp-family-detail-group',
    templateUrl: './family-detail-group.component.html',
    styleUrls: ['./family-detail-group.component.scss']
})
export class FamilyDetailGroupComponent implements OnInit {

    formGroup: FormGroup

    relationships$: Observable<SelectOptionModel[]>
    genders$:  Observable<SelectOptionModel[]>

    endingDate = new Date(Date.now())

    isChild = false

    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _employeeStaticDataervice: EmployeeStaticDataMockService
    ) {
        this.genders$=this._employeeStaticDataervice.genders$
        this.relationships$=this._employeeStaticDataervice.relationships$
        .pipe(
            map(response=> {
                return response.filter(option => {
                    if(option.value as string === 'Child' || option.value as string === 'Other'
                    || option.value === this.getControl('relationship').value) {
                        return true
                    }
                    for (let i = 0; i < this._formGenerator.allFamilyDetails.length; i++) {
                        if(option.value as string === this._formGenerator.allFamilyDetails[i].Relationship?.Name) {
                            return false
                        }
                    }
                    return true
                })
            })
        )
        this.formGroup
            = this._formGenerator.familyDetail

    }

    ngOnInit(): void {}

    getControl(name: string): FormControl {
        return this._formGenerator.getFormControl(name, this.formGroup)
    }

    getFormGroup(name: string): FormGroup {
        return this._formGenerator.getFormGroup(name, this.formGroup)
    }

    onChange() {
        const control = this.getControl('relationship')
        if(control.value === 'Child') {
            this.isChild = true
        } else {
            this.isChild = false
        } 
    }

}