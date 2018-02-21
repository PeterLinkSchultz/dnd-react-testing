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
                handlerDragEnd: clearLayer,
                handlerBlock
            });
        });
    };
    const dragOver = e => {
        //console.log(e.target);
        e.preventDefault();
        //console.log("target", elem);
        props.addItemList();
        //console.log("drag over");
    };
    const dragLeave = e => {
        //e.preventDefault();
        
        if (props.id === props.layers.end) {
            props.setLayerEnd(false, "out");
        }
        let elem = document.elementFromPoint(e.clientX, e.clientY);
        let current = e.currentTarget;
        
        if ( elem != current ) {
            let r = current.closest("."+elem.classList.value);
            console.log(r);
            if ( r === null) {
                props.removeItemList();
            }
        }
            
    };
    const handlerBlock = (e) => {
        //console.log(e);
    }
    const dragEnter = e => {
        //console.log("drag enter");
        e.preventDefault();
        if (!props.layers.start) {
            props.setLayerStart(props.id, "in");
        } else if (props.id !== props.layers.start) {
            props.setLayerEnd(props.id, "in");
        }
        props.addItemList();
    };
    const clearLayer = () => {
        props.clearLayer();
    };
    const drop = e => {
        clearLayer();
        /*
        if (props.active.cat !== props.active.catNew) {
            props.handleUpdate(props.active);
        }
        */
        //props.clearActive();
        console.log('drop item');
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