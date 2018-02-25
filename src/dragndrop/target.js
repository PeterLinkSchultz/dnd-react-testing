import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import { connect } from 'react-redux';
import { changeList } from '../actions/lists';

import DragItem from './source';
const R = require('ramda');
const layerTarget = {
    canDrop(props, monitor) {
        const item = monitor.getItem();
        //console.log("can", item);
        return item;
    },

    hover(props, monitor, component) {
        //console.log('hover');
        const item = monitor.getItem();
            if (props.id !== item.cat) {
                props.addItemList(item);
            }
        //console.log('hover', props );
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
        return connectDropTarget(
            <div className="list_items">
                {
                    R.map((item, key) => {
                        return <DragItem
                            key={key}
                            data={item}
                            handleOver={this.props.handleMove}
                            handleLeave={this.props.handleLeave}
                            handleDragStart={this.props.handleDragStart}
                            handleDragEnd={this.props.handleDragEnd}
                            draggabled={ (this.props.dragItem) ? item.id === this.props.dragItem : false}
                        />
                    }, this.props.list)
                }
            </div>
        );
    }
}
DragLayer = connect(null, { changeList })(DragLayer);
export default DropTarget("item", layerTarget, collect)(DragLayer);