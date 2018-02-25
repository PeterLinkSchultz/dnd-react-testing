import  {
    CHANGE_ITEM_LIST,
    CHANGE_ITEM_SHOW,
    CHANGE_ITEM_POSITION,
    SET_LISTS
} from '../constants/lists';

import { getListApi } from '../api/lists';
import { list } from '../api/data';

export const getList = () => dispatch => {
    dispatch({
        type: SET_LISTS,
        list
    });
};

export const setList = () => async (dispatch, getState) => {
    try {
        const date = await getListApi();
        dispatch({
            type: SET_LISTS,

        })
    } catch (e) {
        console.log(e);
    }
};
export const changeList = (item, position, layers) => dispatch => {
    dispatch({
        type: CHANGE_ITEM_LIST,
        item,
        position,
        start: layers.start,
        end: layers.end
    })
};
export const changePosition = (item, position, fixed) => dispatch => {
    dispatch({
        type: CHANGE_ITEM_POSITION,
        item,
        position,
        fixed
    })
};
export const changeShow = id => dispatch => {
  dispatch({
      type: CHANGE_ITEM_SHOW,
      id
  });
};
