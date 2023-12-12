import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Employee } from "../../Models/Employee";
import { BasicSeedState } from "../../Models/state-models/basic-seed.state.model";
import { SelectOptionModel } from "../../Models/supporting-models/select-option.model";
import { BasicSeedStateService } from "../../state-services/seed-state-services/basic-seed.state.service";
import { CountryService } from "../EmployeeOrganization/country.service";

export const genders = ['Female', 'Male']
export const relationships = ['Spouse', 'Child', 'Mother', 'Father', 'Other']
export const dummyDutyStations = [['EDC CQ (A.A.)', 'Wengelawit Branch (A.A.)'], ['HQ (Pitsburg)']]
export const dummyJobTitles = ['Developer', 'QA', 'HR Officer', 'Finance Office', 'TDM', 'Architect']
export const dummyBusinessUnits = ['Software Development', 'Customer Support']
export const dummyDepartments = ['Management', 'Software Development', 'Customer Support', 'Human Resource', 'Financial Department']
export const dummyEmployementTypes = ['Full Time Permanent', 'Part Time Permanent', 'Full Time Contract', 'Part Time Contract', 'Internship']
export const dummyEmployementStatuses = ['Active', 'Inactive', 'Terminated']
export const dummyDefaultEmployementStatus = dummyEmployementStatuses[0]
export const dummyReportingManagers: SelectOptionModel[] = [
    {
        value: '1234-456adf',
        label: 'Tariku (BootCamp Manager)',
        icon: 'X'
    },
    {
        value: '1234-456adc',
        label: 'Natnael (BootCamp TDM)',
        icon: 'X'
    }
]

function convertToSelectionOptions(values: string[]) {
    return values.map(value => {
        return {
            value: value,
            label: value
        } as SelectOptionModel
    })
}

function generatePrefices(): SelectOptionModel[] {
    const samplePrefices = [
        ['DT', 'Developer'],
        ['QA', 'Quality Assurance'],
        ['SD', 'Software Architect'],
        ['GD', 'Graphics Design'],
        ['PO', 'Project Management'],
        ['CS', 'Customer Support'],
        ['CS', 'Human Resource'],
        ['FO', 'Financial Department'],
        ['LD', 'Legal Department']
    ]
    const countries = [['EDC', 'Ethiopia Delivery Center'], ['HQ', 'Head Quarter']]
    const prefices: SelectOptionModel[] = []
    countries.forEach(country => {
        samplePrefices.forEach(prefix => {
            prefices.push(
                {
                    value: country[0] + '/' + prefix[0],
                    label: country[0] + '/' + prefix[0] + ' ( ' + prefix[1] + ' @ ' + country[1] + ' )'
                } as SelectOptionModel
            )
        })
    })
    return prefices
}

function getDutyStations(country: string) {
    if(country === 'Ethiopia') {
        return dummyDutyStations[0]
    } else if(country === 'United States') {
        return dummyDutyStations[1]
    } else {
        return [
            ...dummyDutyStations[1],
            ...dummyDutyStations[0]
        ]
    }
}

function generateDutyStations(state: EmployeeStaticStateModel) {
    return convertToSelectionOptions(
        getDutyStations(
            state.country
        )
    )
}

interface DutyStation {
    name: string
}

interface EmployeeStaticStateModel extends BasicSeedState<DutyStation> {
    country: string
}

@Injectable({
    providedIn: 'root'
})
export class EmployeeStaticDataMockService
extends BasicSeedStateService<DutyStation, EmployeeStaticStateModel, CountryService>
{
    public readonly employeeIdNumberPrefices$: Observable<SelectOptionModel[]> = of(generatePrefices())
    public readonly genders$: Observable<SelectOptionModel[]> = of(convertToSelectionOptions(genders))
    public readonly relationships$: Observable<SelectOptionModel[]> = of(convertToSelectionOptions(relationships))
    public readonly jobTitles$: Observable<SelectOptionModel[]> = of(convertToSelectionOptions(dummyJobTitles))
    public readonly businessUnits$: Observable<SelectOptionModel[]> = of(convertToSelectionOptions(dummyBusinessUnits))
    public readonly departments$: Observable<SelectOptionModel[]> = of(convertToSelectionOptions(dummyDepartments))
    public readonly employementTypes$: Observable<SelectOptionModel[]> = of(convertToSelectionOptions(dummyEmployementTypes))
    public readonly employementStatuses$: Observable<SelectOptionModel[]> = of(convertToSelectionOptions(dummyEmployementStatuses))
    public readonly reportingManagers$: Observable<SelectOptionModel[]> = of(dummyReportingManagers)

    public readonly dutyStations$ = this._select<SelectOptionModel[]>(generateDutyStations)

    public readonly defaultEmployeeIdNumberPrefix = generatePrefices()[0].value
    public readonly defaultEmployementStatus = dummyEmployementStatuses[0]

    set Country(value: string) {
        this.State = {
            country: value
        }
    }

    load(): void {}

    constructor() {
        super()
    }

}