import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeList, changePosition } from '../actions/lists';
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
            sort: [],
            dragItem: false,
            dynamic: (props.dynamic === undefined) ? false : props.dynamic,
            position: false
        };
    }
    setFilters(name, value, flag) {
        let filter = [];
        console.log(name, value, flag);
        //console.log("state:filter", this.state.filter);
        if (this.state.filter.length > 0) {
            filter = R.map(item => {
                if (flag) {
                    item.values.push(value);
                }
                else if (item.values.length > 1) {
                    item.values = R.filter(val => {
                        return val !== value;
                    }, item.values);
                } else {
                    item = false;
                }
                return item;
            }, this.state.filter);
        } else {
            filter.push({ name, values: [value]});
        }
        console.log("filter", filter);
        this.setState({ filter });
        /*
        let index = R.findIndex(R.propEq("name", name)(filter));
        if ( index !== -1 ) {
            current = {
                name,
                values: value
            };
            filter.push(current);
        } else {
            current = R.find(R.propEq("name", name)(filter));
            if ( flag ) {
                current.values.push(value);
            } else if ( current.values.length > 1 ){
                current.values = current.values.filter( item => { return item !== name });
            } else {
                current = false;
            }
            
        }*/
    }
    setSort(name, value, index) {
        let sort = this.state.sort;
        //console.log(name, value, index);
        sort[index] = { name, value };
        let list = this.sortList(this.state.list, sort);
        this.setState({ sort, list });
    }
    filterList(list, params) {
        if (params.length > 0) {

        }
    }
    sortList(list, params) {
        if (params.length > 0) {
            params.map((sortVal, key) => {
                let sortBy = sortVal.name;
                let sortOrder = sortVal.value
                list = R.sort((a, b) => {
                    if (sortOrder === "ASC")
                        return a[sortBy] > b[sortBy];
                    else
                        return a[sortBy] < b[sortBy];
                }, list);
            });
            //sort.map()
            return list;
        } else {
            return list;
        }

    }
    addItem(data) {
        if (!this.state.dragItem) {
            let list = this.state.list;
            list = R.prepend(data, list);
            this.setState({ list, dragItem: data.id, position: 0 });
        }
    }
    removeItem() {
        let drag = R.filter(item => {
            return item.cat !== this.state.id;
        }, this.state.list);
        if (drag.length > 0) {
            let list = R.filter((item) => {
                return item.id !== this.state.dragItem;
            }, this.state.list);
            this.setState({ list, dragItem: false, position: false });
        }
    }
    checkMove(id, callback) {
        if (this.state.dragItem && id !== this.state.dragItem && this.state.dynamic)
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
    handleUpdate(id, layers) {
        //console.log(this.state.position);
        if (layers.start !== layers.end) {
            this.props.changeList(id, this.state.position, layers);
        } else if (this.state.position !== false) {
            //console.log(this.props);
            this.props.changePosition(id, this.state.position, layers.start);
        }
        //this.props.handleUpdate();
    }
    componentWillReceiveProps(props) {
        let filter = this.state.filter;
        let name = this.state.id;
        let list;
        if (props.list[name] !== undefined) {
            list = R.map(item => { return item }, props.list[name]);
            if (filter.length > 0) {

            }
            if (list.length > 0)
                list = this.sortList(list, this.state.sort);
            this.setState({
                list,
                dragItem: false,
                position: false
            });
        }
    }
    renderChild() {
        //console.log("RENDER BLOCK", this.props.list);
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
        changeList,
        changePosition
    }
)(ListInfo);