import { map, catchError, mergeMap, filter, switchMap, startWith } from "rxjs/operators";
import {Epic, ofType} from "redux-observable";

import {GlobalState} from "../../redux/globalStates";
import {
    getSelectedCoordinateFailed,
    getSelectedCoordinateLoading, getSelectedCoordinateSuccess,
    GoogleMapTypes,
} from "./googleMapStates";
import {from, of} from "rxjs";
import axios from "axios";

export const selectSuggestionEpic: Epic<any, any, GlobalState> = (
    action$,
    state$
) => action$.pipe(
    ofType(GoogleMapTypes.SELECT_SEARCH_LOCATION),
    switchMap(action =>
        from(axios({
            method: 'get',
            url: `/geocode/json?address=${state$.value.googleMap.selectedLocation?.description}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
            insecureHTTPParser: true
        })).pipe(
            map(response => getSelectedCoordinateSuccess(response.data.results[0].geometry.location),
                startWith(getSelectedCoordinateLoading()),
                // updateSearchLocationList(action.payload)
            ),
            catchError(() => of(getSelectedCoordinateFailed())),
        )
    ),
);



