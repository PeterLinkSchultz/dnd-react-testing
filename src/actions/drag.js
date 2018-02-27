import {
    DO_FINISH
} from "../constants/drag";

export const handleFinish = () => dispatch => {
    dispatch({
        type: DO_FINISH
    })
};