import { SET_ACTIVE } from '../constants/active';

export const setActiveItem = item => dispatch => {
    dispatch({
        type: SET_ACTIVE,
        item
    })
}