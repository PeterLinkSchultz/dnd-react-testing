import { createStore, combineReducers, applyMiddleware } from 'redux';

//import { routerMiddleware } from 'react-router-redux';
import {composeWithDevTools } from 'redux-devtools-extension';
//import {browserHistory} from 'react-router';

import reducers from '../reducers';

import thunk from 'redux-thunk';

export const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(thunk),
    //applyMiddleware(routerMiddleware(browserHistory))
)) ;