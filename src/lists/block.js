import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeShow, changeList } from '../actions/lists';
import { setActiveItem } from '../actions/active';
import { setDragItem as setDragItemStore } from '../actions/drag';
const R = require('ramda');

class ListInfo extends Component {
    constructor(props) {
        super(props);
        this.renderChild = this.renderChild.bind(this);
        this.setFilters = this.setFilters.bind(this);
        this.setSort = this.setSort.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.moveItem = this.moveItem.bind(this);
        this.checkMove = this.checkMove.bind(this);
        this.leaveItem = this.leaveItem.bind(this);

        this.state = {
            filter: [],
            id: props.name,
            list: [],
            isDrag: false,
            dragItem: false
        };
    }
    setFilters(name) {

    }
    setSort(sort) {

    }
    addItem(data) {
        let list = this.state.list;
        if (!R.find(R.propEq('id', data.id))(list)) {
            let item = { ...data, active: "H" };
            list = R.prepend(item, list);
            this.setState({ list, isDrag: true, dragItem: data.id });
        }
    }
    removeItem() {
        /*
        if (R.find(R.propEq('new', "Y"))(this.state.list)) {
            let list = R.filter((item) => {
                return item.new !== "Y";
            }, this.state.list);
        }*/
        let list = R.filter((item) => {
            return item.id !== this.state.dragItem;
        }, this.state.list);
        this.setState({ list, isDrag: false });
    }
    checkMove(id, callback) {
        if (id !== this.state.dragItem && this.state.isDrag)
            callback(false, true)
        else
            callback(true, false);
    }
    moveItem(id) {
        this.checkMove(id, (error, success) => {
            if (!error) {
                this.move(id);
            } else
                return false;
        });
    }
    move(id, step = 0) {
        let add;
        let temp = R.filter(item => {
            if (item.id == this.state.dragItem) {
                add = { ...item, active: "D" };
                return false;
            }
            return item.id !== this.state.dragItem;
        }, this.state.list);
        let list = R.insertAll(R.findIndex(R.propEq('id', id))(temp) + step, add, temp);
        this.setState({ list });
    }
    leaveItem(coords, leaveX, leaveY, id) {
        this.checkMove(id, (error, success) => {
            if (!error) {
                console.log("luck!");
                if (leaveX > coords.left && leaveX < coords.right) {
                    if (leaveY <= coords.top) {
                        // before
                    } else if (leaveY >= coords.bottom) {
                        // after
                        this.move(id, 1);
                    }
                } else {
                    console.log('remove');
                    this.removeItem();
                }
            }
            else
                return false;
        });
    }
    componentWillReceiveProps(props) {
        let name = this.state.id;
        //console.log(name, props.list[name]);
        if (props.list[name] !== undefined) {
            //if ( props.list[name].length !== this.state.list.length )
            this.setState({ list: R.map(item => { return item }, props.list[name]), isDrag: false });
        }
    }
    renderChild() {
        return React.Children.map(this.props.children, item => {
            if (item.type.name === "List") {
                return React.cloneElement(item, {
                    list: this.state.list,
                    id: this.state.id,
                    changeList: this.props.changeList,
                    handleUpdate: this.props.handleUpdate,
                    addItemList: this.addItem,
                    removeItemList: this.removeItem,
                    isDrag: this.state.isDrag,
                    handleMove: this.moveItem,
                    handleLeave: this.leaveItem
                    //  changeShow: this.changeShow,
                    //                    changeList: this.changeList
                });
            } else {
                return React.cloneElement(item, {
                    handleFilter: this.setFilters,
                    handleSort: this.setSort
                });
            }
        });
    }
    render() {
        return (
            <div className="list">
                {this.renderChild()}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return {
            draggable: state.dragItem,
            list: state.list
        }
    },
    {
        setActiveItem,
        setDragItemStore,
        changeList
        //changeShowItem: changeShow,
        //changeListItem: changeList
    }
)(ListInfo);