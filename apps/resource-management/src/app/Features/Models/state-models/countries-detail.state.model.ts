import { CountryDetail } from "../supporting-models/country-detail.model";
import { BasicSeedState } from "./basic-seed.state.model";

export interface CountriesDetailStateModel
    extends BasicSeedState<CountryDetail> {

        selectedPrefix?: number

}