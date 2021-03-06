import  {
    CHANGE_ITEM_LIST,
    CHANGE_ITEM_SHOW,
    CHANGE_ITEM_POSITION,
    CHANGE_ITEM_ACTIVE,
    SET_LISTS
} from '../constants/items';

import { getListApi } from '../api/lists';
import { list } from '../api/data';

export const changeItemActive = item => dispatch => {
    dispatch({
        type: CHANGE_ITEM_ACTIVE,
        item
    })
};
export const getList = () => async (dispatch) => {
    try {
        const data = await getListApi();
        dispatch({
            type: SET_LISTS,
            list: data
        })
    } catch (e) {
        dispatch({
            type: SET_LISTS,
            list
        });
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
