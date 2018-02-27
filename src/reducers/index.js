import { combineReducers } from 'redux';

import { listReducer } from './listReducer';
import { activeReducer } from './activeReducer';
import { dragFinish } from './dragFinishReducer';
export default combineReducers({
    list: listReducer,
    active: activeReducer,
    dragFinish
});