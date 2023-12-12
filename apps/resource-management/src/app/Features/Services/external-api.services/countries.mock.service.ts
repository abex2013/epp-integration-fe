import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { BasicSeedState } from "../../Models/state-models/basic-seed.state.model";
import { SelectOptionModel } from "../../Models/supporting-models/select-option.model";

export type PhoneCodeLength = {
    min: number,
    max: number
}

export type StateModel = {
    name: string,
    cities: string[]
}

export interface CountryModel {
    name: string,
    nationality: string,
    phoneCode: string,
    phoneNumberLength: PhoneCodeLength,
    states: StateModel[],
    cities: string[]
}

enum ParameterType {
    Country, PhonePrefix, Nationality
}

interface CountryStateModel extends BasicSeedState<CountryModel> {
    data: CountryModel[],
    selectedCountry: string | null | undefined,
    selectedState: string | null | undefined,
}

@Injectable({
    providedIn: "root"
})
export class CountriesMockService {

    constructor(
        protected readonly _httpClient: HttpClient
    ) {
    }

    // getCountries(): Observable<CountryModel[]> {
    //     return this._httpClient.get(
    //         'https://countriesnow.space/api/v0.1/countries/codes'
    //     )
    //         .pipe(
    //             map((response: any) => {
    //                 console.log('Country')
    //                 console.log(response)
    //                 return response.data.map((country: any) => {
    //                     return {
    //                         name: country.name,
    //                         phoneCode: country.dial_code,
    //                     } as CountryModel
    //                 })
    //             })
    //         )
    // }



    getStates(countryName?: string | null): Observable<SelectOptionModel[]> {
        if (countryName && countryName !== null && countryName !== '') {
            return this._httpClient.post(
                'https://countriesnow.space/api/v0.1/countries/states',
                { country: countryName }
            )
                .pipe(
                    map((response: any) => {
                        return response.data.states.map((state: any) => {
                            return {
                                value: state.name,
                                label: state.name
                            } as SelectOptionModel
                        })
                    })
                )
        }
        return of([])
    }

    getCountries(): Observable<SelectOptionModel[]> {
        return this._httpClient.get(
            'https://countriesnow.space/api/v0.1/countries/iso'
        )
            .pipe(
                map((response: any) => {
                    return response.data.map((country: any) => {
                        return {
                            value: country.name,
                            label: country.name
                        } as SelectOptionModel
                    })
                })
            )
    }

    getCities(countryName?: string | null, stateName?: string | null): Observable<SelectOptionModel[]> {
        if (countryName && countryName !== null && countryName !== '') {
            if (stateName && stateName !== null && stateName !== '') {
                return this._httpClient.post(
                    'https://countriesnow.space/api/v0.1/countries/state/cities',
                    { country: countryName, state: stateName }
                )
                    .pipe(
                        map((response: any) => {
                            return response.data.map((city: any) => {
                                return {
                                    value: city,
                                    label: city
                                } as SelectOptionModel
                            })
                        })
                    )
            } else {
                return this._httpClient.post(
                    'https://countriesnow.space/api/v0.1/countries/state/cities',
                    { country: countryName, state: stateName }
                )
                    .pipe(
                        map((response: any) => {
                            return response.data.states.map((state: any) => {
                                return {
                                    value: state.name,
                                    label: state.name
                                } as SelectOptionModel
                            })
                        })
                    )
            }
        }
        return of([])
    }

    getCountriesPhonePrefices(): Observable<SelectOptionModel[]> {
        return this._httpClient.get(
            'https://countriesnow.space/api/v0.1/countries/codes'
        )
            .pipe(
                map((response: any) => {
                    console.log('Phones')
                    console.log(response)
                    return response.data.map((country: any) => {
                        return {
                            value: country.dial_code,
                            label: country.dial_code + ' ' + country.name
                        } as SelectOptionModel
                    })
                })
            )
    }

    getCountriesPhonePrefixData(): string[] {
        let phonePrefices: string[] = []
        this.getCountriesPhonePrefices()
            .subscribe((phonePrefixOptions: SelectOptionModel[]) => {
                phonePrefices = phonePrefixOptions.map(phonePrefixOption => phonePrefixOption.value as string)
            })
        return phonePrefices
    }

    // generateCountriesData(): CountryModel[] {
    //     const iterations = [1, 2, 3, 4]
    //     const countriesFullData: CountryModel[] = []

    //     for (let i = 0; i < countriesMainDataData.length; i++) {
    //         const filteredData = lists.filter(country => country.name === countriesMainDataData[i].name)
    //         let states: any[] = []
    //         let cities: string[] = []
    //         let recordNotExist = true
    //         if (filteredData.length === 1) {
    //             if (filteredData[0].states.length > 0) {
    //                 states = filteredData[0].states
    //                     .map((state: any) => {
    //                         recordNotExist = false
    //                         return {
    //                             name: state.name,
    //                             cities: iterations
    //                                 .map(iter => 'City' + iter + ' ( ' + countriesMainDataData[i] + ' / ' + state.name + ' )')
    //                         } as StateModel
    //                     })
    //             }
    //         }
    //         if (recordNotExist) {
    //             cities
    //                 = iterations
    //                     .map(iter => 'City' + iter + ' ( ' + countriesMainDataData[i] + ' )')
    //         }

    //         countriesFullData.push(
    //             {
    //                 name: countriesMainDataData[i].name,
    //                 nationality: countriesMainDataData[i].nationality,
    //                 phoneCode: countriesMainDataData[i].phoneCode,
    //                 phoneNumberLength: countriesMainDataData[i].phoneNumberLength as PhoneCodeLength,
    //                 states: states,
    //                 cities: cities
    //             } as CountryModel
    //         )

    //     }

    //     return countriesFullData
    // }

}

@Injectable({
    providedIn: 'root'
})
export class AddressCountryStateService
{
    private _states: SelectOptionModel[] = []
    private _$state = new BehaviorSubject<number>(1)
    country = 'Ethiopia'
    public readonly defaultPhonePrefix = '+251'

    public readonly countries$ = this._countriesMockService.getCountries()
    public readonly phonePrefices$ = of([])//this._select(getPhonePrefixSelectionOptions)
    public readonly nationalities$ = this._countriesMockService.getCountries()
    public readonly stateRegions$ = this._select(this.getStates)

        protected _select(mapFn: () => SelectOptionModel[]): Observable<SelectOptionModel[]> {
        return this._$state.asObservable().pipe(
            map((state: any) => mapFn()),
            distinctUntilChanged()
        );
    }

    set Country(value: string) {
        this._countriesMockService.getStates(this.country)
        .subscribe((response: SelectOptionModel[]) => {
            this._states = response
        })
    }

    getStates() {
        return this._states
    }

    // private readonly _$state = new BehaviorSubject<CountryStateModel>(
    //     {
    //         selectedCountry: 'Ethiopia'
    //     } as CountryStateModel
    // )

    // protected get State(): CountryStateModel {
    //     return this._$state.getValue()
    // }

    // protected set State(value: Partial<CountryStateModel>) {
    //     this._$state.next(
    //         {
    //             ...this.State,
    //             ...value
    //         }
    //     )
    // }

    // load() {
    //     // this._countriesMockService.getCountries()
    //     //     .subscribe((countries: CountryModel[]) => {
    //     //         const priorCountries = ['United States', 'India', 'Ethiopia']
    //     //         let j = 0
    //     //         for (let j = 0; j < priorCountries.length; j++) {
    //     //             for (let i = 0; i < countries.length; i++) {
    //     //                 if (countries[i].name === priorCountries[j]) {
    //     //                     countries = [
    //     //                         countries[i],
    //     //                         ...countries.splice(0, i),
    //     //                         ...countries.splice(i + 1)
    //     //                     ]
    //     //                     break
    //     //                 }
    //     //             }
    //     //         }
    //     //         this.State = {
    //     //             data: countries
    //     //         }
    //     //     })
    // }

    // readonly reset = (() => {
    //     this.State = {
    //         selectedCountry: undefined,
    //         selectedState: undefined
    //     }
    // })

    constructor(
        private readonly _countriesMockService: CountriesMockService
    ) {
        // this.load()
    }
}

// @Injectable({
//     providedIn: 'root'
// })
// export class AddressCountryStateService {

//     private readonly _$state = new BehaviorSubject<CountryStateModel>(
//         {} as CountryStateModel
//     )

//     private _country?: string | null;

//     public readonly countries$ = this._select(this._getCountries)
//     public readonly phonePrefices$ = this._select(getPhonePrefixSelectionOptions)
//     public readonly nationalities$ = this._select(getNationalitySelectionOptions)
//     public readonly stateRegions$ = this._select(this._getStates)
//     // public readonly cities$ = this._select(getCitySelectionOptions)


//     protected get State(): CountryStateModel {
//         return this._$state.getValue()
//     }

//     protected set State(value: Partial<CountryStateModel>) {
//         this._$state.next(
//             {
//                 ...this.State,
//                 ...value
//             }
//         )
//     }

//     set Country(country: string | null | undefined) {
//         this._country = country
//     }

//     set StateRegion(stateRegion: string | null | undefined) {
//         const state = this.State
//         let index: number | undefined = undefined
//         if (stateRegion && stateRegion !== null && state.selectedCountryIndex) {
//             const stateRegions = state.data[state.selectedCountryIndex].states
//             for (let i = 0; i < stateRegions.length; i++) {
//                 if (stateRegion === stateRegions[i].name) {
//                     index = i
//                     break
//                 }
//             }
//         }
//         this.State = {
//             selectedStateIndex: index
//         }
//     }

//     private _getCountries() {
//         const countries: SelectOptionModel[] = []
//         this._countriesMockService.getCountries()
//             .subscribe((response: SelectOptionModel[]) => {
//                 countries.concat(response)
//             })
//         return countries
//     }

//     private _getStates() {
//         const states: SelectOptionModel[] = []
//         this._countriesMockService.getStates(this._country)
//             .subscribe((response: SelectOptionModel[]) => {
//                 states.concat(response)
//             })
//         return states
//     }

//     private _getCities() {
//         const cities: SelectOptionModel[] = []
//         this._countriesMockService.getCities(this._country, this._stateRegion)
//             .subscribe((response: SelectOptionModel[]) => {
//                 cities.concat(response)
//             })
//         return cities
//     }

//     protected _select(mapFn: () => SelectOptionModel[]): Observable<SelectOptionModel[]> {
//         return this._$state.asObservable().pipe(
//             map((state: any) => mapFn()),
//             distinctUntilChanged()
//         );
//     }

//     load(): void {
//         this._countriesMockService.get()
//             .subscribe((countries: CountryModel[]) => {
//                 console.log("Address State")
//                 console.log(countries)
//                 const priorCountries = ['United States', 'India', 'Ethiopia']
//                 let j = 0
//                 for (let j = 0; j < priorCountries.length; j++) {
//                     for (let i = 0; i < countries.length; i++) {
//                         if (countries[i].name === priorCountries[j]) {
//                             countries = [
//                                 countries[i],
//                                 ...countries.splice(0, i),
//                                 ...countries.splice(i + 1)
//                             ]
//                             break
//                         }
//                     }
//                 }
//                 this.State = {
//                     data: countries
//                 }
//             })
//     }

//     readonly reset = (() => {
//         this.State = {
//             selectedCountryIndex: undefined,
//             selectedStateIndex: undefined
//         }
//     })

//     constructor(
//         private readonly _countriesMockService: CountriesMockService
//     ) {
//         this.load()
//         this._country = 'Ethiopia'
//         this._stateRegion = 'Addis Ababa'
//     }
// }

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


function extractCountries(state: CountryStateModel): CountryModel[] {
    return state.data
}

// function extractStateRegions(state: CountryStateModel, countryService?: CountriesMockService): StateModel[] {
//     const stateRegions: StateModel[] = []
//     if (countryService) {
//         countryService.getStates(state.selectedCountry)
//             .subscribe((response: StateModel[]) => {
//                 stateRegions.concat(response)
//             })
//     }
//     return stateRegions
// }

function convertCountriesToSelectionOptions(countries: CountryModel[]): SelectOptionModel[] {
    return countries.map((country: CountryModel) => {
        return {
            value: country.name,
            label: country.name
        } as SelectOptionModel
    })
}

function convertPhonePrefixesToSelectionOptions(countries: CountryModel[]): SelectOptionModel[] {
    return countries.map((country: CountryModel) => {
        return {
            value: country.phoneCode,
            label: country.phoneCode + ' ( ' + country.name + ' )'
        } as SelectOptionModel
    })
}

function convertNationalitiesToSelectionOptions(countries: CountryModel[]): SelectOptionModel[] {
    return countries.map((country: CountryModel) => {
        return {
            value: country.nationality,
            label: country.nationality + ' ( ' + country.name + ' )'
        } as SelectOptionModel
    })
}

function convertStatesToSelectionOptions(stateRegions: StateModel[]): SelectOptionModel[] {
    return stateRegions.map((stateRegion: StateModel) => {
        return {
            value: stateRegion.name,
            label: stateRegion.name
        } as SelectOptionModel
    })
}

// function convertCitiesToSelectionOptions(cities: string[]): SelectOptionModel[] {
//     return cities.map((city: string) => {
//         return {
//             value: city,
//             label: city
//         } as SelectOptionModel
//     })
// }

function getCountrySelectionOptions(state: CountryStateModel): SelectOptionModel[] {
    return convertCountriesToSelectionOptions(
        extractCountries(state)
    )
}

function getPhonePrefixSelectionOptions(state: CountryStateModel): SelectOptionModel[] {
    return convertPhonePrefixesToSelectionOptions(
        extractCountries(state)
    )
}

function getNationalitySelectionOptions(state: CountryStateModel): SelectOptionModel[] {
    return convertNationalitiesToSelectionOptions(
        extractCountries(state)
    )
}

// function getStateSelectionOptions(stateRegions: CountryStateModel, countryService?: CountriesMockService): SelectOptionModel[] {
//     return convertStatesToSelectionOptions(
//         extractStateRegions(stateRegions, countryService)
//     )
// }

// function getCitySelectionOptions(state: CountryStateModel): SelectOptionModel[] {
//     return convertCitiesToSelectionOptions(
//         extractCities(state)
//     )
// }
