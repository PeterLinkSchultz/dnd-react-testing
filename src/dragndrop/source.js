import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import Item from '../lists/item';

const subjectSource = {
    beginDrag(props, monitor, component) {
        //return props;
        props.handleDragStart(props.data.id);
        return { ...props.data };
    },
    endDrag(props, monitor, component) {
        props.handleDragEnd();
        if ( !monitor.didDrop() ) {
            return;
        }
        //console.log(props);
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();
        /*
        props.moveSubject(item.ID, {
            
        });
        */
    }
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        //connectDragPreview: connect.dragPreview()
    }
}

class DragItem extends Component {
    constructor(props) {
        super(props);
        this.handleLeave = this.handleLeave.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            active: false
        }
    }
    handleLeave(e) {
        const coords = e.currentTarget.getBoundingClientRect();
        this.props.handleLeave(coords, e.pageX, e.pageY, this.props.data.id);
    }
    handleClick(e) {
        let active = this.state.acitve ? false : true;
        //console.log(e);
    }
    render() {
        const { connectDragSource, isDragging, draggabled, dragItem, sectionData, data } = this.props;
        return connectDragSource(
            <div 
                onDragEnter={ (e) => { this.props.handleOver(data.id) }}
                onDragLeave={ (e) => { this.handleLeave(e)}}
                onClick={ (e) => { this.handleClick(e)}}
                className={`draggable draggable_item${draggabled ? " draggabled" : ""}${this.props.active ? " active": ""}`}>
            <Item
                data={data}
            />
            </div>
        )
    }
}

export default DragSource("item", subjectSource, collect)(DragItem);