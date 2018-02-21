import { DO_FINISH } from '../constants/drag';

export const dragFinish = (state = false, action) => {
    if ( action.type === DO_FINISH)
        return state ? false : true;
    return state;
};