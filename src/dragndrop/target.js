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
        const item = monitor.getItem();
        if (props.id !== item.cat) {
            if (!props.isDrag) {
                props.addItemList(item);
            } else {
                //console.log(monitor);
            }
        }
        //console.log('hover', props );
    },
    drop(props, monitor) {
        const item = monitor.getItem();
        if (item.cat !== props.id) {
            props.handleUpdate(item.id, { start: item.cat, end: props.id });
        }
    }
}

const collect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        //isOver: monitor.isOver(),
        //isItem: monitor.getItem(),
        //isOverCurrent: monitor.isOver({ shallow: true }),
    }
}

class DragLayer extends Component {
    componentWillUpdate(props) {
        //console.log(props);
        return true;
    }
    render() {
        //console.log("render ",this.props);
        const { isOver, canDrop, connectDropTarget, changeList, handleUpdate, isDrag } = this.props;
        return connectDropTarget(
            <div className="list_items">
                {
                    R.map((item, key) => {
                        return <DragItem
                            key={key}
                            data={item}
                            handleOver={this.props.handleMove}
                            handleLeave={this.props.handleLeave}
                        />
                    }, this.props.list)
                }
            </div>
        );
    }
}
DragLayer = connect(null, { changeList })(DragLayer);
export default DropTarget("item", layerTarget, collect)(DragLayer);