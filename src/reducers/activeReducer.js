import { SET_ACTIVE } from '../constants/active';
const R = require('ramda');

export const activeReducer = ( state = null, action ) => {
    switch ( action.type ) {
        case SET_ACTIVE:
            return action.item;
        break;
        default:
            return state;
        break;
    }
}