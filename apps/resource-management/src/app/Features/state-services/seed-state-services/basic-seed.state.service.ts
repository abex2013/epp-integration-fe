import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { BasicSeedState } from "../../Models/state-models/basic-seed.state.model";
import { BasicSeedApiService } from "../../Services/seed.api-service/basic-seed.api.service";

export abstract class BasicSeedStateService<
    TModel,
    TStateModel extends BasicSeedState<TModel>,
    TApiService
    >
{

    private readonly _$state = new BehaviorSubject<TStateModel>(
        {} as TStateModel
    )

    protected get State(): TStateModel {
        return this._$state.getValue()
    }

    protected set State(value: Partial<TStateModel>) {
        this._$state.next(
            {
                ...this.State,
                ...value
            }
        )
    }

    protected _select<TFilter>(mapFn: (state: TStateModel, apiService?: TApiService) => TFilter): Observable<TFilter> {
        return this._$state.asObservable().pipe(
            map((state: TStateModel) => mapFn(state)),
            distinctUntilChanged()
        );
    }

    abstract load(): void

    constructor() {
        this.load()
    }
}