import React from 'react';
import PropTypes from 'prop-types';

const DragItem = function (props) {
    const dragStart = e => {
        e.dataTransfer.dropEffect = "move";
        props.handleDragStart(props.id);

    };
    const dragEnd = e => {
        console.log("end");
        props.handleDragEnd(props.id);
    };
    const renderChild = () => {
      return React.cloneElement(props.children, {
          active: props.drag
      });
    };
    return (
        <div
            className={`draggable_item${props.drag ? " draggable_item-active" : ""}`}
            draggable={true}
            onDragStart={ (e) => dragStart(e)}
            onDragEnd={ (e) => dragEnd(e)}>
            {renderChild()}
        </div>
    )
};

DragItem.proptypes = {
  handleDragStart: PropTypes.func,
  handleDragEnd: PropTypes.func
};
export default DragItem;