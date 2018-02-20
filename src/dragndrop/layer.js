import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLayer, setActiveItem, clearActive } from '../actions/active';
import { changeList } from '../actions/lists';
const DragLayer = function (props) {

    const renderLayer = () => {
        return React.cloneElement(props.children);
    };
    const dragOver = e => {
        e.preventDefault();
        //console.log("drop over");
    };
    const dragLeave = e => {
        props.setLayer( props.id );
        //console.log('drop leave');
    };
    const dragEnter = e => {
        e.preventDefault();
        props.setLayer( props.id );
        //console.log('drop enter');
        //props.handleDragEnter(props.id);
    };
    const drop = e => {
        if ( props.active.cat !== props.active.catNew ) {
            props.handleUpdate(props.active);
        }
        //props.clearActive();
        console.log('drop item');
    };
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
export default connect(
    (state) => {
        return {
            active: state.active
        }
    },
    {
        clearActive,
        changeList,
        setLayer
    }
)(DragLayer);