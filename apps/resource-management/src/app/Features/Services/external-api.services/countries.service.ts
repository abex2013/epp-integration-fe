import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { citiesURL, countriesURL, employeeIdNumberPreficesURL, phonePreficesURL, statesURL } from "../supporting-services/basic-data.collection";

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    private readonly _coutriesURL = countriesURL
    private readonly _statesURL = statesURL
    private readonly _citiesURL = citiesURL
    private readonly _phonePreficesURL = phonePreficesURL
    private readonly _employeeIdNumberPreficesURL = employeeIdNumberPreficesURL

    constructor(
        private readonly _httpClient: HttpClient
    ) {}

    getCountries(): Observable<string[]> {
        return this._httpClient.get(
            this._coutriesURL
        ).pipe(
            map((response: any) => {
                return response.data
                .map((country: any) => country.name)
            })
        )
    }

    getStateRegionProvices(country: string): Observable<string[]> {
        return this._httpClient.post(
            this._statesURL,
            JSON.stringify({ country: country })
        ).pipe(
            map((response: any) => {
                return response.data.states
                .map((state: any) => state.name)
            })
        )
    }

    getCities(country: string, state: string): Observable<string[]> {
        return this._httpClient.post(
            this._citiesURL,
            JSON.stringify({ country: country, state: state })
        ).pipe(
            map((response: any) => {
                return response.data
            })
        )
    }

    getPhonePrefices(): Observable<string[]> {
        return this._httpClient.get(
            this._phonePreficesURL
        ).pipe(
            map((response: any) => {
                return response.data
                .map((country: any) => country.dial_code)
            })
        )
    }

    getEmployeeIdNumberPrefices(): Observable<string[]> {
        return of(['EDC-HR', 'EDC-DT', 'EDC-QA', 'EDC-FD', 'EDC-LD'])
    }

    // getEmployeeIdNumberPrefices(): Observable<string[]> {
    //     return this._httpClient.get(
    //         this._employeeIdNumberPreficesURL
    //     ).pipe(
    //         map((response: any) => {
    //             return response.data
    //             .map((prefix: any) => prefix)
    //         })
    //     )
    // }

}