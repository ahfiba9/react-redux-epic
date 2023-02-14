interface Params {
    type: string
    payload: {
        searchLocation: string
        suggestedLocation: any
        apiError: any
    }
}

export enum AutoCompleteSearchTypes {
    UPDATE_SEARCH_LOCATION = 'UPDATE_SEARCH_LOCATION',
    RESET_SEARCH_LOCATION = 'RESET_SEARCH_LOCATION',
    SELECT_SEARCH_LOCATION = 'SELECT_SEARCH_LOCATION',
    GET_LOCATION_SUGGESTION_SUCCESS = 'GET_LOCATION_SUGGESTION_SUCCESS',
    GET_LOCATION_SUGGESTION_LOADING = 'GET_LOCATION_SUGGESTION_LOADING',
    GET_LOCATION_SUGGESTION_FAILED = 'GET_LOCATION_SUGGESTION_FAILED',
}

// actions
export const updateSearchLocation = (payload: {
    searchLocation: string
}) => {
    return { type: AutoCompleteSearchTypes.UPDATE_SEARCH_LOCATION, payload }
}

export const resetSearchLocation = () => {
    return { type: AutoCompleteSearchTypes.RESET_SEARCH_LOCATION }
}

export const getLocationSuggestionSuccess = (payload: {
    suggestedLocation: any
}) => {
    return { type: AutoCompleteSearchTypes.GET_LOCATION_SUGGESTION_SUCCESS, payload}
}

export const getLocationSuggestionLoading = () => {
    return { type: AutoCompleteSearchTypes.GET_LOCATION_SUGGESTION_LOADING}
}

export const getLocationSuggestionFailed = () => {
    return { type: AutoCompleteSearchTypes.GET_LOCATION_SUGGESTION_FAILED}
}

export interface Location {
    description: string
    place_id: string
}

export interface AutoCompleteSearchStates {
    searchLocation: string | undefined
    isLoading: boolean
    suggestedLocation: Location[]
    apiError: any
}

// reducer
const initialState: AutoCompleteSearchStates = {
    searchLocation: '',
    isLoading: false,
    suggestedLocation: [],
    apiError: false
}

export const autoCompleteSearchState = (state = initialState, action: Params) => {
    const { type, payload } = action
    switch (type) {
        case AutoCompleteSearchTypes.UPDATE_SEARCH_LOCATION:
            console.log('test = ', payload)
            return {
                ...state,
                searchLocation: payload.searchLocation
            }
        case AutoCompleteSearchTypes.RESET_SEARCH_LOCATION:
            return {
                ...state,
                searchLocation: initialState.searchLocation,
                suggestedLocation: initialState.suggestedLocation
            }
        case AutoCompleteSearchTypes.GET_LOCATION_SUGGESTION_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case AutoCompleteSearchTypes.GET_LOCATION_SUGGESTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                suggestedLocation: payload.suggestedLocation
            }
        case AutoCompleteSearchTypes.GET_LOCATION_SUGGESTION_FAILED:
            return {
                ...state,
                isLoading: false,
                apiError: true
            }
        default:
            return state
    }
}
