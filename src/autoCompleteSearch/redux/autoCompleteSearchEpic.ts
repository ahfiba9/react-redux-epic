
import { of, from } from "rxjs";
import { map, catchError, mergeMap, filter, switchMap, startWith } from "rxjs/operators";
import {Epic, ofType} from "redux-observable";

import {GlobalState} from "../../redux/globalStates";
import {
    AutoCompleteSearchTypes, getLocationSuggestionFailed, getLocationSuggestionLoading,
    getLocationSuggestionSuccess,
    resetSearchLocation
} from "../../autoCompleteSearch/redux/autoCompleteSearchState";
import axios from "axios";

export const searchLocationEpic: Epic<any, any, GlobalState> = (
    action$,
    state$
) => action$.pipe(
    ofType(AutoCompleteSearchTypes.UPDATE_SEARCH_LOCATION),
    switchMap(action =>
        from(axios({
            method: 'get',
            url: `/place/autocomplete/json?input=${state$.value.autoCompleteSearch.searchLocation}&types=geocode&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
            insecureHTTPParser: true
        })).pipe(
            map(response => getLocationSuggestionSuccess({suggestedLocation: response.data.predictions}),
                startWith(getLocationSuggestionLoading()),
            ),
            catchError(() => of(getLocationSuggestionFailed()))
        ))
);



