import React, { Component } from 'react';
import Item from './item';

import DragLayer from '../dragndrop/layer';
import DragItem from '../dragndrop/item';

import { changeShow } from '../actions/lists';

import { connect } from 'react-redux';
const R = require('ramda');

class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        //const list = R.filter((item) => { return item.type === this.props.name }, this.props.list);
        //console.log(this.props);
        return (
            <DragLayer
                handleUpdate={this.props.handleUpdate}
                id={this.props.id}
            >
            <div className="list_items">
                {
                   R.map((item, key) => {
                        return <DragItem
                            //drag={item.active}
                            id={item.id}
                            handleDragStart={this.props.changeShow}
                            handleDragEnd={this.props.changeShow}
                            handleOnDrop={this.props.changeShow}
                            >
                            <Item
                                key={key}
                                name={`Item${item.name}`}
                                active={item.active}
                                cat={item.cat}
                                id={item.id}
                            />
                        </DragItem>
                    }, this.props.list)
                }
            </div>
            </DragLayer>
        );
    }
}
export default List;
/*
export default connect(
    null,
    (dispatch) => ({
        changeShow
    })
)(List);*/