import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import Item from '../items/item';

const subjectSource = {
    beginDrag(props, monitor, component) {
        props.handleDragStart(props.data.id);
        return { ...props.data };
    },
    endDrag(props, monitor, component) {
        props.handleDragEnd();
        if ( !monitor.didDrop() ) {
            return;
        }
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}

class DragItem extends Component {
    constructor(props) {
        super(props);
        this.handleLeave = this.handleLeave.bind(this);
        this.state = {
            active: false
        }
    }
    handleLeave(e) {
        const coords = e.currentTarget.getBoundingClientRect();
        this.props.handleLeave(coords, e.pageX, e.pageY, this.props.data.id);
    }
    render() {
        const { connectDragSource, draggabled, data } = this.props;
        return connectDragSource(
            <div 
                onDragEnter={ (e) => { this.props.handleOver(data.id) }}
                onDragLeave={ (e) => { this.handleLeave(e)}}
                className={`draggable draggable_item${draggabled ? " draggabled" : ""}${this.props.active ? " active": ""}`}>
            <Item
                data={data}
            />
            </div>
        )
    }
}

export default DragSource("item", subjectSource, collect)(DragItem);