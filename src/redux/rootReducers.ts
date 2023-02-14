import {combineReducers} from "redux";
import {autoCompleteSearchState} from "../autoCompleteSearch/redux/autoCompleteSearchState";
import {googleMapState} from "../GoogleMap/redux/googleMapStates";

export const rootReducers = combineReducers({
    autoCompleteSearch: autoCompleteSearchState,
    googleMap: googleMapState
});
