
export interface CountryDetail {

    name: string

    nationality: string

    phonePrefix: string

    phoneDigits: { min: number, max: number }

    states?: StateDetail[]

}

export interface StateDetail {

    name: string

    cities?: string[]

    subcityZones?: string[]

}

export interface CityDetail {

    name: string

    subcities?: SubcityZone

}

export interface SubcityZone {

    name: string

    weredas?: Wereda[]

}

export interface Wereda {

    name: string

}