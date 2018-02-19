import  { ADD_TO_LIST, REMOVE_FROM_LIST, CHANGE_ITEM_STATUS, CHANGE_ITEM_LIST } from '../constants/lists';

export const addItemToList = (item, dispatch) => {
    dispatch({
        type: ADD_TO_LIST,
        item
    })
}

export const removeItemFromList = (id, dispatch) => {
    dispatch({
        type: REMOVE_FROM_LIST,
        id
    });
}

export const changeList = (id, list, dispatch) => {
    dispatch({
        type: CHANGE_ITEM_LIST,
        id: id,
        list
    })
}