import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { SelectOptionModel } from "../../../../Models/supporting-models/select-option.model";
import { AddressCountryStateService, CountriesMockService } from "../../../../Services/external-api.services/countries.mock.service";
import { FormGenerator } from "../../form-generator.model";

@Component({
    selector: 'exec-epp-emergency-address-detail-group',
    templateUrl: './emergency-address-detail-group.component.html',
    styleUrls: ['./emergency-address-detail-group.component.scss']
})
export class EmergencyAddressDetailGroupComponent implements OnInit {

    formGroup: FormGroup

    countries$: Observable<SelectOptionModel[]>
    stateRegions$: Observable<SelectOptionModel[]>

    isEthiopia = false

    stateName = 'State/Province'
    subcityName = 'Address Line 1'
    weredaName = 'Address Line 2'


    constructor(
        private readonly _formGenerator: FormGenerator,
        private readonly _addressCountryStateService: CountriesMockService
    ) {
        this.formGroup
            = this._formGenerator.emergencyAddress
        this.countries$ = this._addressCountryStateService.getCountries()
        this.stateRegions$ = this._addressCountryStateService.getStates(this.formGroup.value.country)      

        

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

    onCountrySelect() {
        const control = this.getControl('country').value as string
        if(control === 'Ethiopia') {
            this.stateName = 'Region'
            this.subcityName = 'Subcity/Zone'
            this.weredaName = 'Wereda'
            this.isEthiopia = true
        } else {
            this.stateName = 'State/Province'
            this.subcityName = 'Address Line 1'
            this.weredaName = 'Address Line 2'
            this.isEthiopia = false
        }
        this.stateRegions$ = this._addressCountryStateService.getStates(control)
    }
    
    onStateSelect() {

    }

    showData(event?: any) {
        console.log(this.formGroup.value)
        console.log(this.formGroup.valid)
    }

}