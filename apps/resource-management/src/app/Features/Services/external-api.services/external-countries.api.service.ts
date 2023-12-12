import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CityDetail, CountryDetail, StateDetail } from "../../Models/supporting-models/country-detail.model";
import { SelectOptionModel } from "../../Models/supporting-models/select-option.model";
import { ReadonlySeedApiService } from "../seed.api-service/readonly-seed.api.service";
import { citiesURL, countriesURL, statesURL } from "../supporting-services/basic-data.collection";

@Injectable({
    providedIn: 'root'
})
export class ExternalCountryApiService extends ReadonlySeedApiService<SelectOptionModel> {

    protected _getParameters(country: string): HttpParams {
        throw new Error("Method not implemented.");
    }

    constructor(
        httpClient: HttpClient
    ) {
        super(httpClient, countriesURL)
        this.setExtractFunctions(
            {
                multiple: ((response: any) => {
                    return response.data
                        .map((country: any) => {
                            return {
                                value: country.name,
                                label: country.name
                            } as SelectOptionModel
                        })
                })
            }
        )
    }

}

@Injectable({
    providedIn: 'root'
})
export class ExternalStateRegionApiService extends ReadonlySeedApiService<SelectOptionModel> {

    protected _getParameters(country: string): unknown {
        return JSON.stringify({ country: country })
    }

    constructor(
        httpClient: HttpClient
    ) {
        super(httpClient, statesURL)
        this.setExtractFunctions(
            {
                multiple: ((response: any) => {
                    return response.data.states
                        .map((state: any) => {
                            return {
                                value: state.name,
                                label: state.name
                            } as SelectOptionModel
                        })
                })
            }
        )
    }

    override getByPost(country: string): Observable<SelectOptionModel[]> {
        return this._httpClient.post<any>(
            this._url,
            JSON.stringify({country: country})
        )
        .pipe(
            map((response: any) => {
                console.log(response)
                return response.data.states
                    .map((state: any) => {
                        return {
                            value: state.name,
                            label: state.name
                        } as SelectOptionModel
                    })
            })
        )
    }

}

@Injectable({
    providedIn: 'root'
})
export class ExternalCitiesApiService extends ReadonlySeedApiService<CityDetail> {

    _getParameters(country: string, state: string): unknown {
        return JSON.stringify({ country: country, state: state })
    }

    constructor(
        httpClient: HttpClient
    ) {
        super(httpClient, citiesURL)
        this.setExtractFunctions(
            {
                multiple: ((response: any) => {
                    return response.data
                        .map((cities: any) => {
                            return {
                                name: cities.name
                            } as CityDetail
                        })
                })
            }
        )
    }

}

@Injectable({
    providedIn: 'root'
})
export class ExternalPhonePrefixApiService extends ReadonlySeedApiService<CountryDetail> {

    _getParameters(country: string, state: string): unknown {
        return JSON.stringify({ country: country, state: state })
    }

    constructor(
        httpClient: HttpClient
    ) {
        super(httpClient, citiesURL)
        this.setExtractFunctions(
            {
                multiple: ((response: any) => {
                    return response.data
                        .map((country: any) => {
                            return {
                                name: country.name,
                                phonePrefix: country.dial_code,
                                phoneDigits: { min: 9, max: 15 }
                            } as CountryDetail
                        })
                })
            }
        )
    }

}
