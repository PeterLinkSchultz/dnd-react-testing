import React from 'react';
import { connect } from 'react-redux';
import { changeItemActive } from '../actions/items';

const Item = function (props) {
    const handleClick = (e) => {
        props.changeItemActive(props.data);
    }
    const renderStatus = e => {
        if ( props.data.status.length > 0 ) {
            return props.data.status.map(item => {
                return <span className={`list_item_point icon icon-${item}`}></span>
            });
        }
    }
    return (
        <div className={`list_item${props.active == props.data.id ? " active" : ""}`} onClick={(e) => { handleClick(e) }}>
            <div className="list_item_name">
                {props.data.name}
            </div>
            <div className="list_item_status">
            {renderStatus()}
            </div>
        </div>
    )
};
export default connect(
    (state) => {
        return {
            active: (state.active !== null) ? state.active.id : null
        }
    },
    {
        changeItemActive
    }
)(Item);