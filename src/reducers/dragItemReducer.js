import { SET_DRAG_ITEM } from '../constants/drag';
const R = require('ramda');

export const dragItem = (state = null, action) => {
    switch (action.type) {
        case SET_DRAG_ITEM:
            return action.item;
            break;
        default:
            return state;
            break;
    }
};