import {CLEAR_ACTIVE, SET_ACTIVE, SET_LAYER, SET_STATUS} from '../constants/active';

export const setActiveItem = item => dispatch => {
    dispatch({
        type: SET_ACTIVE,
        item
    })
};
export const clearActive = cat => dispatch => {
    dispatch({
        type: CLEAR_ACTIVE,
        cat
    })
};
export const setDragLayer = cat => dispatch => {
    dispatch({
        type: SET_LAYER,
        cat
    })
};
export const setDragStatus = drag => dispatch => {
    dispatch({
        type: SET_STATUS,
        drag
    })
};