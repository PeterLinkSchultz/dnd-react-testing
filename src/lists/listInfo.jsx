import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeShow, changeList } from '../actions/lists';
const R = require('ramda');

class ListInfo extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.renderChild = this.renderChild.bind(this);
        this.setFilters = this.setFilters.bind(this);
        this.setSort = this.setSort.bind(this);
        this.changeShow = this.changeShow.bind(this);
        this.changeList = this.changeList.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.state = {
            filter: [],
            list: R.filter((item) => { return ( item.type === props.name ) }, props.list),
            id: 0
        };
    }
    changeShow(id) {
        this.setState( {id} );
        this.props.changeShowItem(id);
    }
    removeItem(id) {
        let list = R.filter((item) => { return item.id !== id }, this.state.list);
        this.setState({ list });
    }
    addItem(item) {
        let list = this.state.list;
        if ( !R.find(R.propEq('id', item.id))(list) ) {
            list.push(item);
            this.setState({ list });
        }
    }
    changeStatus(id, status) {

    }
    changeList(id) {

        this.props.changeListItem(2, this.props.name);
    }
    setFilters(name) {

    }
    setSort(sort) {

    }
    renderChild() {
        return React.Children.map(this.props.children, item => {
            if ( item.type.name === "List" ) {
                return React.cloneElement(item, {
                    list: this.state.list,
                    addItem: this.addItem,
                    removeItem: this.removeItem,
                    changeShow: this.changeShow,
                    changeList: this.changeList
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
                    { this.renderChild() }
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
        changeShowItem: changeShow,
        changeListItem: changeList
    }
    /*
    (dispatch) => {
        return {
            changeShowItem: bindActionCreators(changeShow,dispatch),
            changeListItem: bindActionCreators(changeList,dispatch)
        }
    }*/
    /*
    (dispatch) => {
        return {
            changeShowItem: (id) => {
                dispatch({
                    type: "CHANGE_ITEM_SHOW",
                    id
                })
            }
        }
    }*/
)(ListInfo);