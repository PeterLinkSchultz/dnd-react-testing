import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeList, changePosition } from '../actions/items';

const R = require('ramda');

class ListInfo extends Component {
    constructor(props) {
        super(props);
        this.renderChild = this.renderChild.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.setSort = this.setSort.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.moveItem = this.moveItem.bind(this);
        this.checkMove = this.checkMove.bind(this);
        this.leaveItem = this.leaveItem.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.setDefault = this.setDefault.bind(this);
        this.selectList = this.selectList.bind(this);

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
    setFilter(name, value, type = "S") {
        let filter = this.state.filter;
        let i = R.findIndex(R.propEq("name", name))(filter);
        switch (type) {
            case "L":
                if (i < 0)
                    filter.push({ name, values: [value] });
                else {
                    if (filter[i].values.indexOf(value) < 0)
                        filter[i].values.push(value);
                    else if (filter[i].values.length > 1)
                        filter[i].values = R.filter(item => { return item !== value }, filter[i].values);
                    else
                        filter.splice(i, 1);
                }
                break;
            case "S":
                if (i < 0)
                    filter.push({ name, values: value });
                else
                    filter[i].values = value;
                break;
        }

        this.setState({ filter });
    }
    setSort(name, value, index) {
        let sort = this.state.sort;
        sort[index] = { name, value };
        this.setState({ sort });
    }
    setDefault(params) {
        this.setState({
            filter: params.filter,
            sort: params.sort
        });
    }
    filterList(list) {
        let temp = list;
        if (this.state.filter.length > 0) {
            let closing = function (value) {
                let current = value;
                return {
                    val: function () {
                        return current;
                    },
                    shift: function () {
                        let val = current[0];
                        current = R.drop(1, current);
                        return val;
                    }
                }
            };
            this.state.filter.map((filterVal, key) => {
                let name = filterVal.name;
                let value = filterVal.values;
                if (typeof value === "object") {
                    if (value.length > 0) {
                        temp = temp.filter(item => {
                            let v = new closing(value);
                            while (v.val().length > 0) {
                                let val = v.shift();
                                if (item[name].indexOf(val) < 0)
                                    return false;
                            }
                            return true;
                        });
                    }
                } else {
                    if (value.toString().length > 0) {
                        temp = temp.filter(item => {
                            return item[name].toString().indexOf(value.toString()) < 0 ? false : true;
                        });
                    }
                }
            });
        }
        return temp;
    }
    sortList(list) {
        let temp = list;
        if (this.state.sort.length > 0) {
            this.state.sort.map((sortVal, key) => {
                let sortBy = sortVal.name;
                let sortOrder = sortVal.value;
                temp = R.sort((a, b) => {
                    if (sortOrder === "ASC") 
                        return a[sortBy] > b[sortBy];
                    else
                        return a[sortBy] < b[sortBy];
                }, temp);
            });
        }
        return temp;
    }
    selectList() {
        let list = this.state.list;
        list = this.filterList(list);
        list = this.sortList(list);
        return list;
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

    dragStart(id) {
        this.setState({
            dragItem: id
        });
    }
    dragEnd() {
        this.setState({
            dragItem: false
        });
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
    move(id, step = 0) {
        let add;
        let temp = R.filter(item => {
            if (item.id === this.state.dragItem) {
                add = item;
                return false;
            }
            return item.id !== this.state.dragItem;
        }, this.state.list);
        let position = step + R.findIndex(R.propEq('id', id))(temp);
        let list = R.insertAll(position, add, temp);
        this.setState({ list, position });
    }
    leaveItem(coords, leaveX, leaveY, id) {
        this.checkMove(id, (error, success) => {
            if (!error) {
                if (leaveX > coords.left && leaveX < coords.right) {
                    console.log(leaveY, coords.top, coords.bottom);
                    if (leaveY <= coords.top) {
                        // before
                        
                        console.log("top!");
                    } else if (leaveY >= coords.bottom) {
                        // after
                        
                        console.log("bottom!");
                        this.move(id,1);
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
        if (layers.start !== layers.end) {
            this.props.changeList(id, this.state.position, layers);
        } else if (this.state.position !== false) {
            this.props.changePosition(id, this.state.position, layers.start);
        }
        this.props.handleUpdate();
    }
    componentWillReceiveProps(props) {
        let name = this.state.id;
        let list;
        if (props.list[name] !== undefined) {
            list = R.map(item => { return item }, props.list[name]);
            //list = this.filterList(list);
            //list = this.sortList(list);
            this.setState({
                list,
                dragItem: false,
                position: false
            });
        }
    }
    renderChild() {
        //console.log("RENDER BLOCK", this.state);
        return React.Children.map(this.props.children, item => {
            if (item.type.name === "Connect" && item.type.displayName.indexOf("List") !== -1 || item.type.name === "List") {
                return React.cloneElement(item, {
                    list: this.selectList(this.state.list),
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
                    handleFilter: this.setFilter,
                    handleSort: this.setSort,
                    handleDefault: this.setDefault
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
            list: state.list
        }
    },
    {
        changeList,
        changePosition
    }
)(ListInfo);