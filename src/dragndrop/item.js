import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setActiveItem, setDragStatus } from '../actions/active';
const DragItem = function (props) {
    let drag = "";
    const dragStart = e => {
        props.handleDragStart(props.item);
        console.log('drag!');
        console.log(e);
        //props.setDragStatus("in");
        //props.handleDragStart(props.id, "D");
    };
    const dragEnd = e => {
        console.log("drag end");
        //e.originalEvent.dataTransfer.setData('text/plain', 'anything');
        props.handleDragEnd();
        props.handleDragEndList();
    };
    const renderChild = () => {
        return React.cloneElement(props.children, {
            active: props.drag
        });
    };
    const dragMove = e => {
        //e.preventDefault();
        //console.log('drag move');
    };
    const dragOver = e => {
        //console.log('drag over');
    };
    const dragLeave = e => {
        //console.log('leave item');
    //    props.handlerBlock(e);
        //console.log('drag leave');
        e.preventDefault();
    };
    const dragEnter = e => {
        //console.log('drag enter');
    };
    const mouseDown = (e) => {
        //console.log("down");
        //props.setActiveItem(props.children.props);
        return false;
    };
    const mouseUp = (e) => {
        //console.log("up");
    };
    const mouseClick = (e) => {
        props.handleClick(props.id);
    };
    const setDragStatus = function () {
        if (props.drag) {
            drag = props.drag === "D" ? " draggabled" : " removed";
        }
    }();
    return (
        <div
            draggable={true}
            className={`draggable_item${props.draggable ? " draggabled" : ""}`}
            onDragStart={(e) => dragStart(e)}
            onDragEnd={(e) => dragEnd(e)}
            onDrag={dragMove}
            onDragOver={(e) => dragOver(e)}
            onDragLeave={(e) => dragLeave(e)}
            onDragEnter={(e) => dragEnter(e)}
            onMouseDown={(e) => mouseDown(e)}
            onMouseUp={(e) => mouseUp(e)}
            onClick={(e) => mouseClick(e)}
            onMouseMove={ dragMove }
        >
            {renderChild()}
        </div>
    )
};

DragItem.proptypes = {
    handleDragStart: PropTypes.func,
    handleDragEnd: PropTypes.func,
    handleClick: PropTypes.func
};
export default connect(
    null,
    {
        setActiveItem,
        setDragStatus
    }
)(DragItem);