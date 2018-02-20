import { combineReducers } from 'redux';

import { listReducer } from './listReducer';
import { activeReducer } from './activeReducer';
export default combineReducers({
    list: listReducer,
    active: activeReducer
});