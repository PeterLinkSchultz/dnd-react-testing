import { SET_ACTIVE, SET_LAYER, CLEAR_ACTIVE } from '../constants/active';
const R = require('ramda');

export const activeReducer = ( state = null, action ) => {
    switch ( action.type ) {
        case SET_ACTIVE:
            return {catNew: action.item.cat, ...action.item};
        break;
        case CLEAR_ACTIVE:
            return null;
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