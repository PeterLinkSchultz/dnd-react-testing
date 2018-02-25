import React, { Component } from 'react';
import Item from './item';

import DragLayer from '../dragndrop/target';
import DragItem from '../dragndrop/item';

import { changeList } from '../actions/lists';
import { DropTarget } from 'react-dnd';


import { connect } from 'react-redux';
const R = require('ramda');


class List extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        //const list = R.filter((item) => { return item.type === this.props.name }, this.props.list);
        return (
            <div>
                <DragLayer
                    list={this.props.list}
                    id={this.props.id}
                    handleUpdate={this.props.handleUpdate}
                    addItemList={this.props.addItemList}
                    removeItemList={this.props.removeItemList}
                    handleMove={this.props.handleMove}
                    handleLeave={this.props.handleLeave}
                    handleDragStart={this.props.handleDragStart}
                    handleDragEnd={this.props.handleDragEnd}
                    dragItem={this.props.dragItem}
                />
            </div>
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