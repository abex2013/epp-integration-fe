import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export abstract class BasicSeedApiService<TModel> {

    constructor(
        protected readonly _httpClient: HttpClient,
        protected readonly _url: string,
        protected readonly _httpOption: { [key: string]: any } = {}
    ) {}

    protected _extractGetMultipleDataResponse = ((response: any): TModel[] => {
        throw new Error("Method not implemented.");
    })
    protected _extractGetSingleDataResponse = ((response: any): TModel => {
        throw new Error("Method not implemented.");
    })
    protected _extractAddResponse = ((response: any): any => {
        throw new Error("Method not implemented.");
    })
    protected _extractEditResponse = ((response: any): any => {
        throw new Error("Method not implemented.");
    })
    protected _extractDeleteResponse = ((response: any): any => {
        throw new Error("Method not implemented.");
    })

    public setExtractFunctions(
        extractionFunctions: {
            multiple?: ((response: any) => TModel[]),
            single?: ((response: any) => TModel),
            add?: ((response: any) => any),
            edit?: ((response: any) => any),
            delete?: ((response: any) => any)
        }
    ) {
        if(extractionFunctions.multiple !== undefined) {
            this._extractGetMultipleDataResponse = extractionFunctions.multiple
        }
        if(extractionFunctions.single !== undefined) {
            this._extractGetSingleDataResponse = extractionFunctions.single
        }
        if(extractionFunctions.add !== undefined) {
            this._extractAddResponse = extractionFunctions.add
        }
        if(extractionFunctions.edit !== undefined) {
            this._extractEditResponse = extractionFunctions.edit
        }
        if(extractionFunctions.delete !== undefined) {
            this._extractDeleteResponse = extractionFunctions.delete
        }
    }

    get(): Observable<TModel[]> {
        return this._httpClient.get<any>(
            this._url,
            this._httpOption
        )
        .pipe(
            map((response: any) => this._extractGetMultipleDataResponse(response))
        )
    }

    getById(id: string): Observable<TModel> {
        const params
        = new HttpParams()
        .set('guid', id)
        return this._httpClient.get<any>(
            this._url,
            {...this._httpOption, ...params}
        )
        .pipe(
            map((response: any) => this._extractGetSingleDataResponse(response))
        )
    }

    getByCriteria(params: HttpParams): Observable<TModel[]> {
        return this._httpClient.get<any>(
            this._url,
            {...this._httpOption, ...params}
        )
        .pipe(
            map((response: any) => this._extractGetMultipleDataResponse(response))
        )
    }

    getByPost(params: HttpParams): Observable<TModel[]> {
        return this._httpClient.post<any>(
            this._url,
            params,
            this._httpOption
        )
        .pipe(
            map((response: any) => this._extractGetMultipleDataResponse(response))
        )
    }

    add(item: TModel): Observable<any> {
        return this._httpClient.post<any>(
            this._url,
            item,
            this._httpOption
        )
        .pipe(
            map((response: any) => this._extractAddResponse(response))
        )
    }

    edit(item: TModel): Observable<any> {
        return this._httpClient.put<any>(
            this._url,
            item,
            {...this._httpOption}
        )
        .pipe(
            map((response: any) => this._extractEditResponse(response))
        )
    }

    delete(id: string): Observable<any> {
        const params
        = new HttpParams()
        .set('guid', id)
        return this._httpClient.delete<any>(
            this._url,
            {...this._httpOption, ...params}
        )
        .pipe(
            map((response: any) => this._extractDeleteResponse(response))
        )
    }


}