import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';

import { changeList } from '../actions/items';
import DragItem from './source';

const R = require('ramda');
const layerTarget = {
    canDrop(props, monitor) {
        const item = monitor.getItem();
        return item;
    },

    hover(props, monitor, component) {
        const item = monitor.getItem();
            if (props.id !== item.cat) {
                props.addItemList(item);
            }
    },
    drop(props, monitor) {
        const item = monitor.getItem();
        props.handleUpdate(item.id, { start: item.cat, end: props.id });
    }
};

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        //isItem: monitor.getItem(),
        //isOverCurrent: monitor.isOver({ shallow: true }),
    }
};

class DragLayer extends Component {
    componentWillReceiveProps(props) {
        if ( !props.isOver ) {
            props.removeItemList();
        }
    }
    render() {
        const { connectDropTarget } = this.props;
        const list = this.props.list !== undefined ? this.props.list : [];
        return connectDropTarget(
            <div className="list_items">
                {
                    R.map((item, key) => {
                        return <DragItem
                            key={item.id}
                            active={this.props.activeItem === item.id}
                            data={item}
                            handleOver={this.props.handleMove}
                            handleLeave={this.props.handleLeave}
                            handleDragStart={this.props.handleDragStart}
                            handleDragEnd={this.props.handleDragEnd}
                            draggabled={ (this.props.dragItem) ? item.id === this.props.dragItem : false}
                        />
                    }, list)
                }
            </div>
        );
    }
}
DragLayer = connect(null, { changeList })(DragLayer);
export default DropTarget("item", layerTarget, collect)(DragLayer);