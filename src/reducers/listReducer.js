import  { ADD_TO_LIST, REMOVE_FROM_LIST, CHANGE_ITEM_STATUS, CHANGE_ITEM_LIST, CHANGE_ITEM_SHOW } from '../constants/lists';
const R =  require('ramda');
let list = [
    {
        id: 1,
        name: 1,
        status: [],
        type: "C",
        active: false
    },
    {
        id: 2,
        name: 2,
        status: [],
        type: "U",
        active: false
    }
];

export const listReducer = (state = list, action) => {
    let result = state;
    switch (action.type) {
        case ADD_TO_LIST: 
            return result.push(action.item);
        break;
        case REMOVE_FROM_LIST:
            return R.filter( (n) => {
                    return n !== action.id
                }, state);
        break;
        case CHANGE_ITEM_LIST:
            return R.map( (item, i) => {
                    if ( item.id === action.id )
                        item.type = action.list;
                    return item;
                }, state );
        break;
        case CHANGE_ITEM_SHOW:
            return R.map( (item, i) => {
                if ( item.id === action.id )
                    item.active = !item.active ? true : false;
                return item;
            }, state );
        default:
            return state;
    }
};