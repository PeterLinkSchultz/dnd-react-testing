import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setActiveItem, setDragStatus } from '../actions/active';
const DragItem = function (props) {
    let drag = "";
    const dragStart = e => {
        props.handlerDragStart(props.item);
        //console.log('drag!');
        //e.preventDefault();
        //props.setDragStatus("in");
        //props.handleDragStart(props.id, "D");
    };
    const dragEnd = e => {
        props.handlerDragEnd();
        props.handlerDragEndList();
    };
    const renderChild = () => {
        return React.cloneElement(props.children, {
            active: props.drag
        });
    };
    const dragMove = e => {
        e.preventDefault();
    };
    const dragOver = e => {
    }
    const dragLeave = e => {
        //console.log('leave item');
    //    props.handlerBlock(e);
        //console.log('drag leave');
    }
    const dragEnter = e => {
        props.handlerBlock(e);
        //console.log('drag enter');
    }
    const mouseDown = (e) => {
        //console.log("down");
        //props.setActiveItem(props.children.props);
        return false;
    };
    const mouseUp = (e) => {
        //console.log("up");

    };
    const mouseClick = (e) => {
        props.handlerClick(props.id);
    }
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
            onDrag={(e) => dragMove(e)}
            onDragOver={(e) => dragOver(e)}
            onDragLeave={(e) => dragLeave(e)}
            onDragEnter={(e) => dragEnter(e)}
            onMouseDown={(e) => mouseDown(e)}
            onMouseUp={(e) => mouseUp(e)}
            onClick={(e) => mouseClick(e)}
        //onMouseMove={ mouseMove }
        >
            {renderChild()}
        </div>
    )
};

DragItem.proptypes = {
    handlerDragStart: PropTypes.func,
    handlerDragEnd: PropTypes.func,
    handlerClick: PropTypes.func
};
export default connect(
    null,
    {
        setActiveItem,
        setDragStatus
    }
)(DragItem);