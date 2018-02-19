import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeShow, changeList } from '../actions/lists';
const R = require('ramda');

class ListInfo extends Component {
    constructor(props) {
        super(props);
        
        this.renderChild = this.renderChild.bind(this);
        this.setFilters = this.setFilters.bind(this);
        this.setSort = this.setSort.bind(this);
        this.changeShow = this.changeShow.bind(this);
        this.changeList = this.changeList.bind(this);
        this.state = {
            filter: [],
            id: 0
        };
    }
    changeShow(id) {
        this.setState( {id} );
        this.props.changeShowItem(id);
    }
    changeList(id) {

        this.props.changeListItem(2, this.props.name);
    }
    setFilters(name) {

    }
    setSort(sort) {

    }
    renderChild() {
        let list = R.filter((item) => { return item.type === this.props.name }, this.props.list);
        return React.Children.map(this.props.children, item => {
            if ( item.type.name === "List" ) {
                return React.cloneElement(item, {
                    list,
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
    (dispatch) => {
        return {
            changeShowItem: bindActionCreators(changeShow,dispatch),
            changeListItem: bindActionCreators(changeList,dispatch)
        }
    }
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