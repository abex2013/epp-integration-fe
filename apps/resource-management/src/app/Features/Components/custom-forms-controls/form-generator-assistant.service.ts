import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { SelectOptionModel } from "../../Models/supporting-models/select-option.model";
import { CountriesMockService } from "../../Services/external-api.services/countries.mock.service";
import { EmployeeStaticDataMockService } from "../../Services/external-api.services/employee-static-data.mock.service";

export type ExtractedData = {
    prefix: any,
    value: any,
    suffix: any
}

export class FormGeneratorAssistant {

    private _employeeIdNumberPrefices: string[] = []
    private _phonePrefices: string[] = []

    constructor(
        private readonly _employeeStaticDataMockService: EmployeeStaticDataMockService,
        private readonly _addressCountryStateService: CountriesMockService
    ) {
        this._employeeStaticDataMockService.employeeIdNumberPrefices$
            .subscribe((response: SelectOptionModel[]) => {
                this._employeeIdNumberPrefices = response.map(option => option.value as string)
            });
        this._addressCountryStateService.getCountriesPhonePrefices()
            .subscribe((response: SelectOptionModel[]) => {
                this._phonePrefices = response.map(option => option.value as string)
            })
    }

    protected _extractEmployeeIdNumber(employeeIdNumber?: string | null): ExtractedData {
        const result = {
            prefix: this._employeeIdNumberPrefices[0],
            value: null,
            suffix: null
        } as ExtractedData
        
        if (employeeIdNumber && employeeIdNumber !== null && employeeIdNumber !== '') {
            let noofMatches = 0
            for (let i = 0; i < this._employeeIdNumberPrefices.length; i++) {
                
                const prefix = employeeIdNumber.substring(0, this._employeeIdNumberPrefices[i].length)
                console.log(this._employeeIdNumberPrefices[i] === prefix
                    && this._employeeIdNumberPrefices[i].length > noofMatches)
                if (this._employeeIdNumberPrefices[i] === prefix
                    && this._employeeIdNumberPrefices[i].length > noofMatches) {
                        result.prefix = this._employeeIdNumberPrefices[i]
                    noofMatches = this._employeeIdNumberPrefices[i].length
                   
                }
            }
            result.value = employeeIdNumber.substring(noofMatches);
        }
        return result
    }

    protected _extractPhoneNumber(phoneNumber?: string | null): ExtractedData {
        const result = {
            prefix: '+251',
            value: null,
            suffix: null
        } as ExtractedData
        if (phoneNumber && phoneNumber !== null && phoneNumber !== '') {
            let noofMatches = 0
            for (let i = 0; i < this._phonePrefices.length; i++) {
                // console.log(this._phonePrefices[i])
                const prefix = phoneNumber.substring(0, this._phonePrefices[i].length)
                if (this._phonePrefices[i] === prefix
                    && prefix.length > noofMatches) {
                    result.prefix = this._phonePrefices[i]
                    noofMatches = this._phonePrefices[i].length
                }
            }
            result.value = phoneNumber.substring(noofMatches);
        }
        return result
    }

    errorMessageforPersonalDetails(formGroup: FormGroup) {
        let i = 0
        Object.values(formGroup.controls).forEach(control => {
            if (i === 0 || i === 1) {
                this.errorMessageForGroups(control as FormGroup)
            } else if (i === 4) {
                this.errorMessageForEmail(control as FormArray)
            } else if (i === 5) {
                this.errorMessageForPhone(control as FormArray)
            } else {
                this.validateControl(control as FormControl)
            }
            i += 1
        });
    }

    errorMessageforOrganizationDetails(formGroup: FormGroup) {
        let i = 0
        Object.values(formGroup.controls).forEach(control => {
            if (i === 2) {
                this.errorMessageForEmail(control as FormArray)
            } else if (i === 3) {
                this.errorMessageForPhone(control as FormArray)
            } else {
                this.validateControl(control as FormControl)
            }
            i += 1
        });
    }

    errorMessageforAddressDetails(formGroup: FormGroup) {
        let i = 0
        Object.values(formGroup.controls).forEach(control => {
            if (i === 6) {
                this.errorMessageForPhone(control as FormArray)
            } else {
                this.validateControl(control as FormControl)
            }
            i += 1
        });
    }

    errorMessageforFamilyDetails(formGroup: FormGroup) {
        let i = 0
        Object.values(formGroup.controls).forEach(control => {
            if (i === 1) {
                this.errorMessageForGroups(control as FormGroup)
            } else {
                this.validateControl(control as FormControl)
            }
            i += 1
        });
    }

    errorMessageforEmergencyContactDetails(emergencyGroup: FormGroup, addressGroup: FormGroup) {
        let i = 0
        Object.values(emergencyGroup.controls).forEach(control => {
            if (i === 0) {
                this.errorMessageForGroups(control as FormGroup)
            } else if (i === 2) {
                this.errorMessageForEmail(control as FormArray)
            } else if (i === 3) {
                this.errorMessageForPhone(control as FormArray)
            } else {
                this.validateControl(control as FormControl)
            }
            i += 1
        });
        i = 0
        Object.values(addressGroup.controls).forEach(control => {
            this.validateControl(control as FormControl)
            //   if (i === 6) {
            //       this.errorMessageForPhone(control as FormArray)
            //   } else {
            //       this.validateControl(control as FormControl)
            //   }
            //   i += 1
        });

    }

    errorMessageForGroups(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            this.validateControl(control as FormControl)
        });
    }

    errorMessageForEmail(formArray: FormArray) {
        Object.values(formArray.controls).forEach(control => {
            this.validateControl(control as FormControl)
        });
    }

    errorMessageForPhone(formArray: FormArray) {
        Object.values(formArray.controls).forEach(control => {
            this.errorMessageForGroups(control as FormGroup)
        });
    }

    validateControl(control: FormControl) {
        if (control.invalid) {
            const value = control.value
            control.setValue(null)
            control.setValue(value)
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
        }
    }

}