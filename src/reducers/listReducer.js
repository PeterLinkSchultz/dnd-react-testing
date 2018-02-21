import  { ADD_TO_LIST, REMOVE_FROM_LIST, CHANGE_ITEM_STATUS, CHANGE_ITEM_LIST, CHANGE_ITEM_SHOW, SET_LISTS } from '../constants/lists';
const R =  require('ramda');

export const listReducer = (state = [], action) => {
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
            let id = action.item;
            let start = action.start;
            let end = action.end;
            let list = state;
            let add;
            list[start] = R.filter( item => {
                if ( item.id === id ) {
                   // console.log("item", item);
                    add = {...item, cat: end};
                    return false;
                }
                return true;
            }, list[start]);
            delete add.draggable;
            list[end].push(add);
            //console.log(list);
            return list;
            /*
            let cat = action.item.cat;
            let catNew = action.item.catNew;
            let add;
            let list = state;
            list[cat] = R.filter( item => {
                if ( item.id === action.item.id ) {
                    add = {...item, cat: catNew};
                    return false;
                }
                return true;
            }, state[cat]);
            list[catNew].push(add);*/
            /*
            return R.map( (item, i) => {
                    if ( item.id === action.id )
                        item.type = action.list;
                    return item;
                }, state );*/
        break;
        case CHANGE_ITEM_SHOW:
            return R.map( (item, i) => {
                if ( item.id === action.id )
                    item.active = !item.active ? true : false;
                return item;
            }, state );
        case SET_LISTS:
            let catList = {};
            action.list.forEach((item) => {
                if ( catList[item.cat] === undefined )
                    catList[item.cat] = [];
                catList[item.cat].push(item);
            });
            return catList;
            break;
        default:
            return state;
            break;
    }
};