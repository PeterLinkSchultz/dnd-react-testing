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
        //this.changeShow = this.changeShow.bind(this);
        //this.changeList = this.changeList.bind(this);
        //this.removeItem = this.removeItem.bind(this);
        this.addItem = this.addItem.bind(this);
        //this.changeStatus = this.changeStatus.bind(this);
        this.state = {
            filter: [],
            id: 0,
            list: props.list
        };
    }
    componentDidUpdate (props, state) {
        if ( this.props.list.length !== props.list.length )
            this.setState({ list: this.props.list });
        return true;
    }
    addItem(item) {
        let list = this.state.list;
        if ( !R.find(R.propEq('id', item.id))(list) ) {
            list.push(item);
            this.setState({ list });
        }
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
                    id: this.props.name
                    //removeItem: this.removeItem
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
                    { this.renderChild() }
                </div>
        );
    }
}

export default ListInfo;
/*connect(
    null,
    /*(state) => {
        return {
            list: state.list
        }
    },
    {
        //changeShowItem: changeShow,
        //changeListItem: changeList
    }
)(ListInfo);*/