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
        //this.changeShow = this.changeShow.bind(this);
        //this.changeList = this.changeList.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.setDragItem = this.setDragItem.bind(this);
        this.clearDragItem = this.clearDragItem.bind(this);
        this.setActiveItem = this.setActiveItem.bind(this);
        this.state = {
            filter: [],
            id: 0,
            list: props.list,
            dragID: "",
            dragS: ""
        };
    }
    componentDidUpdate(props, state) {
        //console.log(props);
        if (this.props.list.length !== props.list.length)
            this.setState({ list: this.props.list });
        return true;
    }
    addItem() {
        let list = this.state.list;
        if (!R.find(R.propEq('id', this.props.draggable.id))(list)) {
            let item = {...this.props.draggable, new: "Y"};
            list.push(item);
            this.setState({ list });
        }
    }
    removeItem() {
        if (R.find(R.propEq('new', "Y"))(this.state.list)) {
            let list = R.filter( (item) => {
                return item.new !== "Y";
            }, this.state.list);
            this.setState({ list });
        }
    }
    setDragItem(object, status) {
        this.props.setDragItemStore(object);
        let list = R.map((item) => {
            if ( object.id === item.id ) {
                item.draggable = true;
            }
            return item;
        }, this.state.list);
        this.setState({ list });
        /*
        if ( this.state.dragID !== id ) {
            this.setState( { dragID: id, dragS: status });
        }*/
    }
    setActiveItem(item) {
        this.props.setActiveItem(item);
    }
    clearDragItem() {
        let list = R.map((item) => {
            if ( item.draggable ) {
                item.draggable = false;
            }
            return item;
        }, this.state.list);
        this.setState({ list });
    }

    setFilters(name) {

    }
    setSort(sort) {

    }
    renderChild() {
        //console.log("render", this.props.name, this.props.list);
        return React.Children.map(this.props.children, item => {
            if (item.type.name === "List") {
                return React.cloneElement(item, {
                    list: this.state.list,
                    id: this.props.name,
                    addItemList: this.addItem,
                    setDragItemList: this.setDragItem,
                    clearDragItem: this.clearDragItem,
                    handlerClick: this.setActiveItem,
                    removeItemList: this.removeItem
                    //  changeShow: this.changeShow,
                    //                    changeList: this.changeList
                });
            } else {
                return React.cloneElement(item, {
                    handlerFilter: this.setFilters,
                    handlerSort: this.setSort
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
            draggable: state.dragItem
        }
    },
    {
        setActiveItem,
        setDragItemStore
        //changeShowItem: changeShow,
        //changeListItem: changeList
    }
)(ListInfo);