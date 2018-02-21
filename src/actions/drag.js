import { SET_DRAG_LAYER_START, SET_DRAG_LAYER_END, CLEAR_DRAG_LAYER, SET_DRAG_LAYERS, SET_DRAG_ITEM } from "../constants/drag";

export const setLayerStart = (val, status) => dispatch => {
    dispatch({
        type: SET_DRAG_LAYER_START,
        val,
        status
    })
};
export const setLayers = (start = false, end = false, status) => dispatch => {
    dispatch({
        type: SET_DRAG_LAYERS,
        start,
        end,
        status
    })
};
export const setLayerEnd = (val, status) => dispatch => {
    dispatch({
        type: SET_DRAG_LAYER_END,
        val,
        status
    })
};
export const clearLayer = () => dispatch => {
    dispatch({
        type: CLEAR_DRAG_LAYER
    })
};
export const setDragItem = (item) => dispatch => {
    dispatch({
        type: SET_DRAG_ITEM,
        item
    })
};