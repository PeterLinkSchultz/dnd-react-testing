import React from 'react';
import PropTypes from 'prop-types';

const DragLayer = function (props) {

    const renderLayer = () => {
        return React.cloneElement(props.children);
    };
    const dragOver = e => {
   //   console.log("over");
    };
    const dragLeave = e => {
      //console.log('leave');
    };
    const dragEnter = e => {
        props.handleDragEnter(props.id);
    };
    return(
        <div

            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDragEnter={dragEnter}
            className="draggable draggable_layer"
        >
            {renderLayer()}
        </div>
    );
};
DragLayer.proptypes = {
  handleDragOver: PropTypes.func,
  handleDragLeave: PropTypes.func,
  handleDragEnter: PropTypes.func
};
export default DragLayer;