import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setActiveItem } from '../actions/active';
const DragItem = function (props) {
    const dragStart = e => {
        //e.preventDefault();
        //props.handleDragEnd(props.id);
        e.dataTransfer.dropEffect = "none";
        e.dataTransfer.effectAllowed = "all";
    };
    const dragEnd = e => {
        //props.handleDragEnd(props.id);
    };
    const renderChild = () => {
        return React.cloneElement(props.children, {
            active: props.drag
        });
    };
    const drag = e => {
        e.preventDefault();
    };

    const mouseDown = (e) => {
        props.setActiveItem(props.children.props);
        return false;
    };
    return (
        <div
            className={`draggable_item${props.drag ? " draggable_item-active" : ""}`}
            draggable={true}
            onDragStart={(e) => dragStart(e)}
            onDragEnd={(e) => dragEnd(e)}
            onDrag={(e) => drag(e)}
            onMouseDown={(e) => mouseDown(e)}
            //onMouseUp={(e) => mouseUp(e)}
            //onMouseMove={ mouseMove }
        >
            {renderChild()}
        </div>
    )
};

DragItem.proptypes = {
    handleDragStart: PropTypes.func,
    handleDragEnd: PropTypes.func
};
export default connect(
    null,
    {
        setActiveItem
    }
)(DragItem);