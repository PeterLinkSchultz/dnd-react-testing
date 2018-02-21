import { SET_DRAG_LAYER_START, SET_DRAG_LAYER_END, CLEAR_DRAG_LAYER, SET_DRAG_LAYERS } from "../constants/drag";

const start = {
    start: false, 
    end: false, 
    status: "in"
};
export const dragLayer = (state = start , action) => {
    switch (action.type) {
        case SET_DRAG_LAYERS:
        return {
            start: action.start ? action.start : state.start,
            end: action.end ? action.end : state.end,
            status: action.status
        };
        break;
        case SET_DRAG_LAYER_START:
        return {
            start: action.val,
            end: state.end,
            status: action.status
        };
        break;
        case SET_DRAG_LAYER_END:
        return {
            start: state.start,
            end: action.val,
            status: action.status
        };
        break;
        case CLEAR_DRAG_LAYER: 
            return start;
        break;
        default: 
            return state;
        break;
    }
};