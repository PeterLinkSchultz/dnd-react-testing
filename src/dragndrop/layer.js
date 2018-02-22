import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDragLayer, setActiveItem, clearActive, setDragStatus } from '../actions/active';
import { setLayerStart, setLayerEnd, clearLayer, setLayers } from '../actions/drag';
import { changeList } from '../actions/lists';
import { setTimeout } from 'timers';
const DragLayer = function (props) {
    let over = false;
    const renderLayer = () => {
        return React.Children.map(props.children, item => {
            return React.cloneElement(item, {
                handleDragEnd: props.clearLayer
            });
        });
    };
    const dragOver = e => {
        //console.log("over");
        //console.log(e.target);
        e.preventDefault();
        //console.log("target", elem);
        //props.addItemList();
        //console.log("drag over");
    };
    const dragLeave = e => {
        e.preventDefault();
        let elem = document.elementFromPoint(e.clientX, e.clientY);
        let current = e.currentTarget;
        if ( elem !== current ) {
            let r = current.getElementsByClassName(elem.classList[0]);
            if ( r.length === 0 ) {
                if (props.id === props.layers.end) {
                    props.setLayerEnd(false, "out");
                }
                props.removeItemList();
            }
        }
    };
    const dragEnter = e => {
        e.preventDefault();
        if (!props.layers.start) {
            props.setLayerStart(props.id, "in");
        } else if (props.id !== props.layers.start && !props.layers.end ) {
            props.setLayerEnd(props.id, "in");
        }
        props.addItemList();
    };
    const drop = e => {
        if(e.preventDefault) { e.preventDefault(); }
        if(e.stopPropagation) { e.stopPropagation(); }
        if ( props.layers.start !== props.layers.end && props.layers.end ) {
            props.handleUpdate(props.layers);
            props.clearLayer();
        }
        //console.log('drop item');
    };
    return (
        <div
            onDragOver={dragOver}
            onDragLeave={dragLeave}
            onDragEnter={dragEnter}
            onDrop={drop}
            className={`draggable draggable_layer ${props.classNames}`}
        >
            {renderLayer()}
        </div>
    );
};
DragLayer.proptypes = {
};
export default connect(
    (state) => {
        return {
            active: state.active,
            layers: state.dragLayer
        }
    },
    {
        clearActive,
        changeList,
        setLayerStart,
        setLayerEnd,
        setLayers,
        clearLayer
    }
)(DragLayer);