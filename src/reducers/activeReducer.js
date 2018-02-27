import { CHANGE_ITEM_ACTIVE } from '../constants/items';
const R = require('ramda');

export const activeReducer = (state = null, action) => {
    switch (action.type) {
        case CHANGE_ITEM_ACTIVE:
            if ( state !== null && state.id == action.item.id )
                return null;
            return action.item;
            break;
        default:
            return state
            break;
    }
};