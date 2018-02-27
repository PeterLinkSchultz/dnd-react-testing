import  { CHANGE_ITEM_POSITION, CHANGE_ITEM_LIST, CHANGE_ITEM_SHOW, SET_LISTS } from '../constants/items';
const R = require('ramda');

export const listReducer = (state = [], action) => {
    let list = state;
    let id;
    let add;
    switch (action.type) {
        case CHANGE_ITEM_LIST:
            console.log("change item", action);
            id = action.item;
            let start = action.start;
            let end = action.end;
            list[start] = R.filter( item => {
                if ( item.id === id ) {
                   // console.log("item", item);
                    add = {...item, cat: end};
                    return false;
                }
                return true;
            }, list[start]);
            list[end] = R.insertAll(action.position, add, list[end]);
            return list;
        break;
        case CHANGE_ITEM_POSITION:
            console.log(action);
            id = action.item;
            let cat = action.fixed;
            let temp = R.filter(item => {
                if (item.id === id) {
                    add = item;
                    return false;
                }
                return item.id !== id;
            }, list[cat]);
            list[cat] = R.insertAll(action.position, add, temp);
            return list;
          return state;
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