import React from 'react';

const Item = function (props) {

    return (
        <div className="list_item">
            {props.name}
        </div>
    )
};

export default Item;