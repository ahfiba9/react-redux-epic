import {AutoCompleteSearchStates} from "../autoCompleteSearch/redux/autoCompleteSearchState";
import {GoogleMapStates} from "../GoogleMap/redux/googleMapStates";

export interface GlobalState {
    autoCompleteSearch: AutoCompleteSearchStates
    googleMap: GoogleMapStates
}

export type GetState = () => GlobalState
