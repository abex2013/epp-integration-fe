import { BehaviorSubject, Observable } from "rxjs";

export class StateService<T>
{
    readonly state$: Observable<T>;
    private _state$: BehaviorSubject<T>
 
    constructor(initalState: T) {
        this._state$ = new BehaviorSubject<T>(initalState);
        this.state$ = this._state$.asObservable();
    }

    protected get state(): T {
        return this._state$.getValue();
    }

    protected setState(newState: Partial<T>): void {
        this._state$.next({
            ...this.state,
            ...newState,
          });
    }
    
}
