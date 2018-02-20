import React from 'react';
import PropTypes from 'prop-types';

const DragLayer = function (props) {

    const renderLayer = () => {
        return React.cloneElement(props.children);
    };
    const dragOver = e => {
        e.preventDefault();
        //console.log("drop over");
    };
    const dragLeave = e => {
        //console.log('drop leave');
    };
    const dragEnter = e => {
        e.preventDefault();
        //console.log('drop enter');
        //props.handleDragEnter(props.id);
    };
    const drop = e => {
        console.log('drop item');
    }
    const mouseLeave = e => {
        if (window.dragItem === undefined)
            e.preventDefault();
        else {
            console.log('leave!');
        }
    }
    const mouseEnter = e => {
        console.log('enter!');
        if (window.dragItem === undefined)
            e.preventDefault();
        else {
            console.log('enter!');
        }
    }
    return (
        <div
//            onMouseLeave={ mouseLeave }
          //  onMouseEnter={ async (e) => { await mouseEnter(e) }}
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDragEnter={dragEnter}
            onDrop={drop}
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