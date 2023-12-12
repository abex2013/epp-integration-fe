// import { Injectable } from "@angular/core";
// import { of } from "rxjs";
// import { CountriesDetailStateModel } from "../Models/state-models/countries-detail.state.model";
// import { CountryDetail, StateDetail } from "../Models/supporting-models/country-detail.model";
// import { ExternalCitiesApiService, ExternalCountryApiService, ExternalPhonePrefixApiService, ExternalStateRegionApiService } from "../Services/external-api.services/external-countries.api.service";
// import { BasicSeedStateService } from "./seed-state-services/basic-seed.state.service";
// import { convertStringsToSelectOptions, convertStringToSelectOption, dummyCountriesData, dummyDefaultPhonePrefix, dummyDefaultEmployeeIdNumberPrefix, dummyEmployeeIdNumberPrefices, dummyGendersData, dummyNationalitiesData, dummyPhonePreficesData } from "../Services/supporting-services/basic-data.collection"

// @Injectable({
//     providedIn: 'any'
// })
// export class AddressDataStateService
//     extends BasicSeedStateService<
//     CountryDetail,
//     CountriesDetailStateModel
//     >
// {
//     //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//     // Test Data
//     public readonly countriesName$ = of(convertStringsToSelectOptions(dummyCountriesData))
//     public readonly phonePrefices$ = of(dummyPhonePreficesData)
//     public readonly stateRegions$ = of(convertStringsToSelectOptions(dummyNationalitiesData))
//     public readonly cities$ = of(convertStringsToSelectOptions(dummyNationalitiesData))
    
//     public readonly defaulPhonePrefix$ = of(dummyDefaultPhonePrefix)
    
//     // public readonly countriesName$ = this._select<string[]>(
//     //     (state: CountriesDetailStateModel) => {
//     //         return state.data.map(country => country.name)
//     //     }
//     // )

    

//     // public readonly stateRegions$ = this._select<string[]>(
//     //     (state: CountriesDetailStateModel) => {
//     //         return state.data.map(country => country.name)
//     //     }
//     // )

//     // public readonly phonePrefices$ = this._select<{ name: string, prefix: string }[]>(
//     //     (state: CountriesDetailStateModel) => {
//     //         return state.data.map(country => {
//     //             return {
//     //                 name: country.name,
//     //                 prefix: country.phonePrefix
//     //             }
//     //         })
//     //     }
//     // )

//     // loadStateRegions() {
//     //     const countries = this.State.data
//     //     if (this.State.selected) {
//     //         if(countries[this.State.selected].states) {
//     //             return
//     //         }
//     //         this._statesService.getByPost(this.State.data[this.State.selected].name)
//     //             .subscribe((stateRegions: StateDetail[]) => {
                    
//     //                 if (this.State.selected) {
//     //                     countries[this.State.selected].states = stateRegions
//     //                     this.State = {
//     //                         data: countries
//     //                     }
//     //                 }
//     //             })
//     //     }
//     // }

//     // loadCities() {
//     //     const countries = this.State.data
//     //     if (this.State.selected && this.State.selectedPrefix) {
//     //         if(countries[this.State.selected].states &&
//     //             countries[this.State.selected].states[this.State.selectedPrefix].cities) {
//     //             return
//     //         }
//     //         this._statesService.getByPost(this.State.data[this.State.selected].name)
//     //             .subscribe((stateRegions: StateDetail[]) => {
                    
//     //                 if (this.State.selected) {
//     //                     countries[this.State.selected].states = stateRegions
//     //                     this.State = {
//     //                         data: countries
//     //                     }
//     //                 }
//     //             })
//     //     }

//     // }

//     load(): void {
//         // this._countriesService.get()
//         //     .subscribe((countries: CountryDetail[]) => {
//         //         this._phonePreficesService.get()
//         //             .subscribe((countriesPhone: CountryDetail[]) => {
//         //                 countries.map((country: CountryDetail) => {
//         //                     const countryPhones =
//         //                         countriesPhone.filter(countryPhone => countryPhone.name === country.name)
//         //                     return {
//         //                         ...country,
//         //                         ...countryPhones[0]
//         //                     }
//         //                 })
//         //                 this.State = {
//         //                     ...this.State,
//         //                     ...{
//         //                         data: countries
//         //                     }
//         //                 } as CountriesDetailStateModel
//         //             })
//         //     })
//     }

//     constructor(
//         private readonly _countriesService: ExternalCountryApiService,
//         private readonly _statesService: ExternalStateRegionApiService,
//         private readonly _citiesService: ExternalCitiesApiService,
//         private readonly _phonePreficesService: ExternalPhonePrefixApiService
//     ) {
//         super()
//     }

//     set selectedCountry(name: string) {
//         const countries = this.State.data
//         let index = -1
//         for (let i = 0; i < countries.length; i++) {
//             if (countries[i].name === name) {
//                 index = i
//                 break
//             }
//         }
//         if (index !== -1) {
//             this.State = {
//                 selected: index
//             }
//         }
//     }

//     set selectedPhonePrefix(prefix: string) {
//         const countries = this.State.data
//         let index = -1
//         for (let i = 0; i < countries.length; i++) {
//             if (countries[i].phonePrefix === prefix) {
//                 index = i
//                 break
//             }
//         }
//         if (index !== -1) {
//             this.State = {
//                 selectedPrefix: index
//             }
//         }
//     }
// }