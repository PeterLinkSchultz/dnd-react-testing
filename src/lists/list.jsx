import React, { Component } from 'react';

import { connect } from 'react-redux';
const R = require('ramda');

class List extends Component {
    constructor(props) {
        super(props);
        console.log(props.list);
    }

    render() {
        //const list = R.filter((item) => { return item.type === this.props.name }, this.props.list);
        return (
            <div className="list_items">
                {
                    R.map((item, key) => {
                        return <div className="list_item" key>Item</div>
                    }, this.props.list)
                }
            </div>
        );
    }
}

export default List;