import { SelectOptionModel } from "../../Models/supporting-models/select-option.model"

// Data and FormControls
const today = new Date(Date.now())
export const employeeIdNumberSeparator = '/'
export const minNumberofEmployeeIdNumberPart1 = 1
export const maxNumberofEmployeeIdNumberPart1 = 5
export const numberofEmployeeIdNumberPart2 = 2

export const minNumberofCharactersinName = 3
export const maxNumberofCharactersinName = 25

export const minEmployeeDateofBirth = undefined
export const maxEmployeeDateofBirth = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())

export const maxNumberofEmailandPhoneNumbers = 3

export const minNumberofCharactersinEmail = 8
export const maxNumberofCharactersinEmail = 255
export const minNumberofCharactersinEmailSegment = 1
export const minNumberofPeriodinEmailSegmentafterAt = 1
export const maxNumberofPeriodinEmailSegmentafterAt = 2

export const minNumberofDigitsinPhoneNumber = 9
export const maxNumberofDigitsinPhoneNumber = 14
export const charatersIngnoredinPhoneNumber = [' ', '(', ')']
export const orderofIngnoredCharctersinPhoneNumber = ['(', ')']
export const nearestEmployeeDateofBirth
    = new Date(
        (new Date()).getMonth()
        + '/' + (new Date()).getDate()
        + '/' + ((new Date()).getFullYear() - 21)
    )

export const separatorsinDescriptions = {
    space: ' ',
    backSlash: '/',
    at: '@',
    period: '.',
    hyphen: '-'
}

export const defaultEmployeeIdNumberPrefices = ['EDC/DT', 'EDC/QA', 'EDC/HR', 'EDC/FD', 'EDC/LT']

// Usefull data

export const countriesURL = 'https://countriesnow.space/api/v0.1/countries/states'
export const statesURL = 'https://countriesnow.space/api/v0.1/countries/states'
/*
{
    "country": "Nigeria"
}
*/
export const citiesURL = 'https://countriesnow.space/api/v0.1/countries/state/cities'
/*
{
    "country": "Nigeria",
    "state": "Lagos"
}
*/
export const phonePreficesURL = 'https://countriesnow.space/api/v0.1/countries/codes'

export const employeeIdNumberPreficesURL = ''


export const dummyGendersData = ['Female', 'Male']
export const dummyCountriesData = ['Ethiopia', 'India', 'United States']
export const dummyPhonePreficesData: SelectOptionModel[] = [
    {
        value: '+251',
        label: '+251 Ethiopia'
    },
    {
        value: '+54',
        label: ' +54 India'
    },
    {
        value: '+1',
        label: '  +1 United States ( US )'
    }
]
export const dummyDefaultPhonePrefix = dummyPhonePreficesData[0]
export const dummyNationalitiesData = ['Ethiopian', 'Indian', 'American']
export const dummyEmployeeIdNumberPrefices = ['EDC/DT', 'EDC/QA', 'EDC/HR', 'EDC/FD', 'EDC/LT']
export const dummyDefaultEmployeeIdNumberPrefix = dummyEmployeeIdNumberPrefices[0]
export const dummyDutyStations = ['EDC HQ', 'Wengelawit Branch (A.A.']
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

export function convertStringsToSelectOptions(params:string[]) {
    return params.map(param => {
        return { value: param, label: param } as SelectOptionModel
    })
}

export function convertStringToSelectOption(param:string) {
    return { value: param, label: param } as SelectOptionModel
}

