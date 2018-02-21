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
        this.handleUpdate = this.handleUpdate.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.setDragItem = this.setDragItem.bind(this);
        this.clearDragItem = this.clearDragItem.bind(this);
        this.setActiveItem = this.setActiveItem.bind(this);

        this.state = {
            filter: [],
            id: props.name,
            list: [],
            dragID: "",
            dragS: ""
        };
    }
    componentWillReceiveProps(props) {
        let name = this.state.id;
        //console.log(name, props.list[name]);
        if ( props.list[name] !== undefined ) {
            //if ( props.list[name].length !== this.state.list.length )
                this.setState({ list: R.map( item => { return item}, props.list[name] ) });
        }
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
    setDragItem(object) {
        this.props.setDragItemStore(object);
        let list = R.map((item) => {
            if ( object.id === item.id ) {
                item.draggable = true;
            }
            return item;
        }, this.state.list);
        this.setState({ list });
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
    handleUpdate(layers) {
        this.props.handleUpdate(this.props.draggable.id, layers);
    }
    setFilters(name) {

    }
    setSort(sort) {

    }
    renderChild() {

        console.log("render", this.props.draggable);
        return React.Children.map(this.props.children, item => {
            if (item.type.name === "List") {
                return React.cloneElement(item, {
                    list: this.state.list,
                    id: this.props.name,
                    addItemList: this.addItem,
                    setDragItemList: this.setDragItem,
                    clearDragItem: this.clearDragItem,
                    handleClick: this.setActiveItem,
                    handleUpdate: this.handleUpdate,
                    removeItemList: this.removeItem
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
        setDragItemStore
        //changeShowItem: changeShow,
        //changeListItem: changeList
    }
)(ListInfo);