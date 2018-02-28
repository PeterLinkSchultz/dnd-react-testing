import { CHANGE_ITEM_ACTIVE } from '../constants/items';

export const activeReducer = (state = null, action) => {
    switch (action.type) {
        case CHANGE_ITEM_ACTIVE:
            if ( state !== null && state.id === action.item.id )
                return null;
            return action.item;
        default:
            return state;
    }
};