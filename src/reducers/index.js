import { combineReducers } from 'redux';

import { listReducer } from './listReducer';
import { activeReducer } from './activeReducer';
import { dragLayer } from './dragLayerReducer';
import { dragFinish } from './dragFinishReducer';
import { dragItem } from './dragItemReducer';
export default combineReducers({
    list: listReducer,
    active: activeReducer,
    dragItem,
    dragLayer,
    dragFinish
});