import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { Action } from 'redux';
import {GlobalState} from "./globalStates";
import {searchLocationEpic} from "../autoCompleteSearch/redux/autoCompleteSearchEpic";
import {selectSuggestionEpic} from "../GoogleMap/redux/googleMapEpic";


export const rootEpic = combineEpics(searchLocationEpic, selectSuggestionEpic);

export default createEpicMiddleware<Action, Action, GlobalState>();
