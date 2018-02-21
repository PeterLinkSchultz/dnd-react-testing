import { SET_ACTIVE, SET_LAYER, CLEAR_ACTIVE, SET_STATUS } from '../constants/active';
const R = require('ramda');

export const activeReducer = ( state = null, action ) => {
    switch ( action.type ) {
        case SET_ACTIVE:
            return {catNew: action.item.cat, drag: false, ...action.item};
        break;
        case CLEAR_ACTIVE:
            return null;
        case SET_STATUS: 
            return {...state, drag: action.drag};
        case SET_LAYER:
            let item = state;
            if ( state.catNew !== action.cat ) {
                item.catNew = action.cat;
            }
            return item;
            break;
        default:
            return state;
        break;
    }
};