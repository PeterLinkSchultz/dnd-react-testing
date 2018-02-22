import React from 'react';

const Item = function (props) {
    return (
        <div className="list_item">
            item {props.data.name}
        </div>
    )
};

export default Item;