import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BasicSeedApiService } from "./basic-seed.api.service";

export abstract class ReadonlySeedApiService<TModel>
    extends BasicSeedApiService<TModel>
{
    constructor(
        httpClient: HttpClient,
        url: string
    ) {
        super(httpClient, url)
    }

    protected abstract _getParameters(...parameters: unknown[]): unknown

    override getByPost(...args: unknown[]): Observable<TModel[]> {
        const params = this._getParameters(...args)
        return this._httpClient.post<any>(
            this._url,
            params,
            this._httpOption
        )
        .pipe(
            map((response: any) => {
                console.log(response)
                return this._extractGetMultipleDataResponse(response)
            })
        )
    }

}