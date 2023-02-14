import { Location} from './../../../src/autoCompleteSearch/redux/autoCompleteSearchState'

interface Coordinate {
    lat: number
    lng: number
}

interface Params {
    type: string
    payload: {
        selectedLocation: Location
        selectedCoordinate: Coordinate
    }
}

export interface GoogleMapStates {
    selectedLocation: Location | null
    locationHistory: Location[]
    selectedCoordinate: Coordinate | null
    isLoading: boolean
    apiError: boolean
}

export enum GoogleMapTypes {
    SELECT_SEARCH_LOCATION = 'SELECT_SEARCH_LOCATION',
    UPDATE_SEARCH_LOCATION_LIST = 'UPDATE_SEARCH_LOCATION_LIST',
    GET_SELECTED_COORDINATE_SUCCESS = 'GET_SELECTED_COORDINATE_SUCCESS',
    GET_SELECTED_COORDINATE_LOADING = 'GET_SELECTED_COORDINATE_LOADING',
    GET_SELECTED_COORDINATE_FAILED = 'GET_SELECTED_COORDINATE_FAILED'
}

// actions
export const selectSearchLocation = (payload: {
    selectedLocation: Location
}) => {
    return { type: GoogleMapTypes.SELECT_SEARCH_LOCATION, payload }
}

export const updateSearchLocationList = (payload: Location) => {
    return { type: GoogleMapTypes.UPDATE_SEARCH_LOCATION_LIST, payload }
}

export const getSelectedCoordinateSuccess = (payload: Coordinate) => {
    return { type: GoogleMapTypes.GET_SELECTED_COORDINATE_SUCCESS, payload }
}

export const getSelectedCoordinateLoading = () => {
    return { type: GoogleMapTypes.GET_SELECTED_COORDINATE_LOADING}
}

export const getSelectedCoordinateFailed = () => {
    return { type: GoogleMapTypes.GET_SELECTED_COORDINATE_FAILED}
}

// reducer
const initialState: GoogleMapStates = {
    selectedLocation: null,
    locationHistory: [],
    selectedCoordinate: null,
    isLoading: false,
    apiError: false
}

export const googleMapState = (state = initialState, action: Params) => {
    const { type, payload } = action
    switch (type) {
        case GoogleMapTypes.SELECT_SEARCH_LOCATION:
            return {
                ...state,
                selectedLocation: payload.selectedLocation
            }
          case GoogleMapTypes.GET_SELECTED_COORDINATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                selectedCoordinate: payload
            }
        case GoogleMapTypes.UPDATE_SEARCH_LOCATION_LIST:
            return {
                ...state,
                locationHistory: !!payload ? [...state.locationHistory, payload] : state.locationHistory
            }
        case GoogleMapTypes.GET_SELECTED_COORDINATE_LOADING:
            return {
                ...state,
                isLoading: true,
                apiError: false
            }
        case GoogleMapTypes.GET_SELECTED_COORDINATE_FAILED:
            return {
                ...state,
                isLoading: false,
                apiError: true
            }
        default:
            return state
    }
}
