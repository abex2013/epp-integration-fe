// import { Injectable } from "@angular/core";
// import { of } from "rxjs";
// import { CountriesDetailStateModel } from "../Models/state-models/countries-detail.state.model";
// import { CountryDetail, StateDetail } from "../Models/supporting-models/country-detail.model";
// import { ExternalCitiesApiService, ExternalCountryApiService, ExternalPhonePrefixApiService, ExternalStateRegionApiService } from "../Services/external-api.services/external-countries.api.service";
// import { convertStringsToSelectOptions, convertStringToSelectOption, dummyBusinessUnits, dummyCountriesData, dummyDefaultEmployementStatus, dummyDepartments, dummyDutyStations, dummyEmployementStatuses, dummyEmployementTypes, dummyJobTitles, dummyNationalitiesData, dummyReportingManagers } from "../Services/supporting-services/basic-data.collection";
// import { BasicSeedStateService } from "./seed-state-services/basic-seed.state.service";

// @Injectable({
//     providedIn: 'root'
// })
// export class OrganizationDetailStateService
//     extends BasicSeedStateService<
//     CountryDetail,
//     CountriesDetailStateModel
//     >
// {
//     //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//     // Test Data
//     public readonly countriesName$ = of(convertStringsToSelectOptions(dummyCountriesData))
//     public readonly dutyStations$ = of(convertStringsToSelectOptions(dummyDutyStations))
//     public readonly jobTitles$ = of(convertStringsToSelectOptions(dummyJobTitles))
//     public readonly businessUnits$ = of(convertStringsToSelectOptions(dummyBusinessUnits))
//     public readonly departments$ = of(convertStringsToSelectOptions(dummyDepartments))
//     public readonly employementTypes$ = of(convertStringsToSelectOptions(dummyEmployementTypes))
//     public readonly employementStatuses$ = of(convertStringsToSelectOptions(dummyEmployementStatuses))
//     public readonly defaultEmployementStatus$ = of(convertStringToSelectOption(dummyDefaultEmployementStatus))
    
//     public readonly reportingManagers$ = of(dummyReportingManagers)


//     load(): void {
//         // this._countriesService.get()
//         //     .subscribe((countries: CountryDetail[]) => {
//         //         this.State = {
//         //             data: countries
//         //         }
//         //     })
//     }

//     constructor(
//         private readonly _countriesService: ExternalCountryApiService
//     ) {
//         super()
//     }

//     set selectedCountry(name: string) {
//         // const countries = this.State.data
//         // let index = -1
//         // for (let i = 0; i < countries.length; i++) {
//         //     if (countries[i].name === name) {
//         //         index = i
//         //         break
//         //     }
//         // }
//         // if (index !== -1) {
//         //     this.State = {
//         //         selected: index
//         //     }
//         // } else {
//         //     this.State = {
//         //         selected: undefined
//         //     }
//         // }
//     }

// }