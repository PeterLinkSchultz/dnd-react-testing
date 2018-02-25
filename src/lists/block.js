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
        this.handleUpdate = this.handleUpdate.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.moveItem = this.moveItem.bind(this);
        this.checkMove = this.checkMove.bind(this);
        this.leaveItem = this.leaveItem.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);

        this.state = {
            filter: [],
            id: props.name,
            list: [],
            dragItem: false,
            dynamic: (props.dynamic === undefined) ? false : props.dynamic,
            position: false
        };
    }
    setFilters(name) {

    }
    setSort(sort) {

    }
    addItem(data) {
        if ( !this.state.dragItem ) {
            let list = this.state.list;
            list = R.prepend(data, list);
            this.setState({ list, dragItem: data.id, position: 0 });
        }
    }
    removeItem() {
        let drag = R.filter( item => {
            return item.cat !== this.state.id;
        }, this.state.list);
        if ( drag.length > 0 ) {
            let list = R.filter((item) => {
                return item.id !== this.state.dragItem;
            }, this.state.list);
            this.setState({ list, dragItem: false, position: false });
        }
    }
    checkMove(id, callback) {
        if ( this.state.dragItem && id !== this.state.dragItem && this.state.dynamic )
            callback(false, true);
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
    dragStart(id) {
        //console.log('start', id);
        this.setState({
            dragItem: id
        });
    }
    dragEnd() {
        this.setState({
            dragItem: false
        });
    }
    move(id, step = 0) {
        let add;
        let temp = R.filter(item => {
            if (item.id === this.state.dragItem) {
                add = item;
                return false;
            }
            return item.id !== this.state.dragItem;
        }, this.state.list);
        let position = R.findIndex(R.propEq('id', id))(temp);
        let list = R.insertAll(position + step, add, temp);
        this.setState({ list, position });
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
    handleUpdate(id, layers){
        console.log(this.state.position);
        if ( layers.start !== layers.end ) {
            this.props.handleUpdate(id, this.state.position, layers);
        } else if ( this.state.position !== false ) {
            console.log(this.props);
            this.props.handleUpdatePosition(id, this.state.position, layers.start);
        }
    }
    componentWillReceiveProps(props) {
        //console.log("update!");
        let name = this.state.id;
        //console.log(name, props.list[name]);
        if (props.list[name] !== undefined) {
            //if ( props.list[name].length !== this.state.list.length )
            this.setState({
                list: R.map(item => { return item }, props.list[name]),
                dragItem: false,
                position: false
            });
        }
    }
    renderChild() {
        //console.log(this.state);
        return React.Children.map(this.props.children, item => {
            if (item.type.name === "List") {
                return React.cloneElement(item, {
                    list: this.state.list,
                    id: this.state.id,
                    dynamic: this.state.dynamic,
                    dragItem: this.state.dragItem,
                    addItemList: this.addItem,
                    removeItemList: this.removeItem,
                    handleMove: this.moveItem,
                    handleLeave: this.leaveItem,
                    handleDragStart: this.dragStart,
                    handleDragEnd: this.dragEnd,
                    handleUpdate: this.handleUpdate
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
    }
)(ListInfo);