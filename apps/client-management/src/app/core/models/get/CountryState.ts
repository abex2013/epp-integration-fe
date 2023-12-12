export interface CountryState{
    name: string,
    iso3: string,
    states: State[]
}

export interface State{
    name: string,
    state_code: string
}