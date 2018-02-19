import React, { Component } from 'react';

import { connect } from 'react-redux';

const R = require('ramda');

class ListInfo extends Component {
    constructor(props) {
        super(props);
        
        this.renderChild = this.renderChild.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.setSort = this.setSort.bind(this);

        this.state = {
            filter: []
        };
        this.list = R.filter((item) => { return item.type === this.props.name }, this.props.list);
    }
    setFilter(name) {
        console.log(name);
    }
    setSort(sort) {

    }
    renderChild() {
        return React.Children.map(this.props.children, item => {
            if ( item.type.name === "List" ) {
                return React.cloneElement(item, { list: this.list });
            } else {
                return React.cloneElement(item, {
                    handlerFilter: this.setFilter,
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

    }
)(ListInfo);