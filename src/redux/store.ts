import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import epicMiddleware, { rootEpic } from './rootEpics';
import {rootReducers} from "./rootReducers";

const composeEnhancer = composeWithDevTools({
  name: 'React with Epic'
});

const store = createStore(
    rootReducers,
    composeEnhancer(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(rootEpic);

export default store;
