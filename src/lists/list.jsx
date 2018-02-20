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
                handleDragEnter={this.props.changeList}
                id={this.props.id}
            >
            <div className="list_items">
                {
                   R.map((item, key) => {
                        return <DragItem
                            drag={item.active}
                            id={item.id}
                            key={key}
                            handleDragStart={this.props.changeShow}
                            handleDragEnd={this.props.changeShow}
                            handleOnDrop={this.props.changeShow}
                            >
                            <Item
                                name={`Item${item.name}`}
                                active={item.active}
                                list={item.type}
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