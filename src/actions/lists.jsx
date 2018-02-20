import  {
    ADD_TO_LIST,
    REMOVE_FROM_LIST,
    CHANGE_ITEM_STATUS,
    CHANGE_ITEM_LIST,
    CHANGE_ITEM_SHOW,
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
export const changeList = (item) => dispatch => {
    dispatch({
        type: CHANGE_ITEM_LIST,
        item
    })
};

export const changeShow = id => dispatch => {
  dispatch({
      type: CHANGE_ITEM_SHOW,
      id
  });
};
