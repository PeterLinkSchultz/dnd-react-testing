export const dragFinish = (state = false, action) => {
    if ( action.type === "SET_FINISH")
        return true;
    else
        return false;
}